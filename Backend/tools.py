import numpy as np
import av
import torch
from transformers import VivitForVideoClassification

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
