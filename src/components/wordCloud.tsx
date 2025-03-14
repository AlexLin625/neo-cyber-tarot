export function WordCloud(keywords: string[]) {
  return (
    <div className="text-white font-thin flex-row flex-wrap w-full p-5 my-3 rounded-xl border border-foreground/80 border-solid">
      {keywords.map((word) => {
        const size =
          Math.max(12, 36 * (1.2 / word.length)) *
          (Math.random() * 0.2 + 1);

        return (
          <span
            style={{ fontSize: `${size}px` }}
            className="pr-3 py-2"
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
