import numpy as np
import av
import torch
import librosa
import numpy as np
import torch.nn.functional as F
import torch.nn as nn
from transformers import AutoModel

def read_video_pyav(container, indices):
    container.seek(0)
    frames, start_index, end_index = [], indices[0], indices[-1]
    for i, frame in enumerate(container.decode(video=0)):
        if i > end_index:
            break
        if i >= start_index and i in indices:
            reformatted_frame = frame.reformat(width=224, height=224)
            frames.append(reformatted_frame)
    return np.stack([x.to_ndarray(format="rgb24") for x in frames])

def sample_frame_indices(clip_len, frame_sample_rate, seg_len):
    converted_len = int(clip_len * frame_sample_rate)
    end_idx = np.random.randint(converted_len, seg_len)
    start_idx = end_idx - converted_len
    indices = np.linspace(start_idx, end_idx, num=clip_len)
    indices = np.clip(indices, start_idx, end_idx - 1).astype(np.int64)
    return indices

def read_video(video_file):
    container = av.open(video_file)
    indices = sample_frame_indices(
        clip_len=10,
        frame_sample_rate=2,
        seg_len=container.streams.video[0].frames
    )
    video = read_video_pyav(container=container, indices=indices)
    return video

def run_inference(model, video):
    video = torch.from_numpy(video).float()
    video = video.permute(0, 3, 1, 2)

    inputs = {"pixel_values": video.unsqueeze(0)}
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()
        result = {
            "label": model.config.id2label[predicted_class_idx],
            "score": max(logits.softmax(-1).tolist()[0])
        }
    return result


def extract_mel_spectrogram(file_path, sr=16000, n_mels=128, n_fft=2048, hop_length=512):
    y, _ = librosa.load(file_path, sr=sr, mono=True)
    mel_spec = librosa.feature.melspectrogram(
        y=y, sr=sr, n_mels=n_mels, n_fft=n_fft, hop_length=hop_length
    )
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    return mel_spec_db

def resize_spectrogram(spec, fixed_length=256):
    batch, channel, n_mels, width = spec.shape
    if width < fixed_length:
        pad_amount = fixed_length - width
        spec = F.pad(spec, (0, pad_amount), "constant", 0)
    elif width > fixed_length:
        spec = spec[..., :fixed_length]
    return spec

def predict_single_sample(model, file_path, fixed_length=256, device=torch.device("cpu")):
    mel_spec = extract_mel_spectrogram(file_path)
    spec_tensor = torch.tensor(mel_spec, dtype=torch.float32).unsqueeze(0)
    spec_tensor = spec_tensor.unsqueeze(0)
    spec_tensor = resize_spectrogram(spec_tensor, fixed_length=fixed_length)
    spec_tensor = spec_tensor.to(device)
    model.eval()
    with torch.no_grad():
        output = model(spec_tensor)
        probabilities = torch.softmax(output, dim=1)
        pred_label = torch.argmax(probabilities, dim=1).item()
    result = {
        "label": ['real','fake'][pred_label],
        "score": max(probabilities.cpu().tolist()[0])
    }
    return result

class AudioCNN(nn.Module):
    def __init__(self, num_classes):
        super(AudioCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 16, kernel_size=3, stride=1, padding=1)
        self.bn1   = nn.BatchNorm2d(16)
        self.pool  = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1)
        self.bn2   = nn.BatchNorm2d(32)
        self.conv3 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.bn3   = nn.BatchNorm2d(64)
        self.fc1 = nn.Linear(64 * 16 * 32, 256)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(256, num_classes)
    def forward(self, x):
        x = self.pool(F.relu(self.bn1(self.conv1(x))))
        x = self.pool(F.relu(self.bn2(self.conv2(x))))
        x = self.pool(F.relu(self.bn3(self.conv3(x))))
        x = x.view(x.size(0), -1)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x
