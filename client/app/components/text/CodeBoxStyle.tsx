import TypewriterText from "./TypewriterText";

function CodeBoxStyle({ children }: { children: string }) {
  return (
    <pre className="bg-surface text-text p-4 rounded-lg overflow-x-auto">
      <code className="font-mono text-sm whitespace-pre leading-relaxed">
        <TypewriterText text={children} />
      </code>
    </pre>
  );
}

export default CodeBoxStyle;
