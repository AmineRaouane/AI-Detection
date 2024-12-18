import { Image, Type, Video, AudioLines } from "lucide-react";

export const products = [
    {
        logo: Image,
        title: "Image detector",
        description: 'Detects AI-generated images and deepfakes using advanced algorithms to analyze patterns, textures, and inconsistencies that are characteristic of AI manipulation. Tools like **Optic** and **Winston AI** provide insights into whether an image was created by AI models such as DALL-E or Stable Diffusion, offering confidence scores and forensic details for verification.'
    },
    {
        logo: Type,
        title: "Text detector",
        description: 'Identifies AI-generated text through tools like **GPTZero** and **OpenAI Text Classifier**, which analyze writing patterns to distinguish between human and machine-generated content. These tools provide detailed feedback on the likelihood of AI involvement in the text, helping users maintain authenticity in their writing.'
    },
    {
        logo: Video,
        title: "Video detector",
        description: 'Analyzes video content for signs of AI manipulation or deepfakes. Tools such as **Sensity** and **Deepfake Detection** utilize machine learning to detect synthetic alterations, ensuring the integrity of video media by identifying manipulated or artificially generated footage.'
    },
    {
        logo: AudioLines,
        title: "Audio detector",
        description: 'Evaluates audio files to detect synthetic voices or AI-generated speech. Tools like **Hive Moderation** can identify content created by generative audio models, providing insights into the authenticity of audio recordings and ensuring accurate representation in audio media.'
    }
];
