import { Textarea } from '@/components/ui/textarea';

function TextContent({ content, setContent }: { content: string; setContent: (val: string) => void }) {
  return (
    <Textarea
      placeholder="Enter your text here to analyze..."
      className="min-h-[300px] max-h-[300px] bg-gray-900/50 border-gray-700 text-gray-100"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}

export default TextContent;
