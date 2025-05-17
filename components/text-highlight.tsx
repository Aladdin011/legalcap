interface TextHighlightProps {
  text: string
  highlight: string
  className?: string
}

export function TextHighlight({ text, highlight, className = "" }: TextHighlightProps) {
  if (!highlight.trim()) {
    return <span className={className}>{text}</span>
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-blush-pink/30 rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  )
}
