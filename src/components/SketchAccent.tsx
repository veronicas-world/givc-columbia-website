export type SketchKind =
  | 'leaves' | 'sprig' | 'sparkles' | 'star' | 'dots'
  | 'rays' | 'loop' | 'zigzag' | 'ribbon' | 'splash';

interface SketchAccentProps {
  kind: SketchKind;
  className?: string;
}

/** Actual sketches extracted from the chapter's supplied reference, with the background removed. */
export function SketchAccent({ kind, className }: SketchAccentProps) {
  return (
    <img
      className={['sketch-accent', `sketch-${kind}`, className].filter(Boolean).join(' ')}
      src={`/images/sketches/${kind}.png`}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
