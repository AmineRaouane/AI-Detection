import { Textarea } from '@/components/ui/textarea';

interface TextContentProps {
  content: string;
  setContent: (val: string) => void;
  setResult: (val: any) => void;  // Changed type to accept a parameter
}

function TextContent({ content, setContent, setResult }: TextContentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setResult(null);  // Reset result when typing new content
  };

  return (
    <Textarea
  aria-label="Text input for AI analysis"
  placeholder="Enter your text here to analyze..."
  className="min-h-[300px] max-h-[300px] bg-gray-900/50 border-gray-700 text-gray-100"
  value={content}
  onChange={handleChange}
/>

  );
}

export default TextContent;
