"use client";
import { useEffect, useState } from "react";

function TypewriterText({ text, classes }: { text: string; classes?: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={`cursor ${classes || ""}`}>{displayedText}</span>;
}

export default TypewriterText;
