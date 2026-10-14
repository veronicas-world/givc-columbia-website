import { SketchAccent, type SketchKind } from './SketchAccent';

const arrangements: Record<'garden' | 'notes' | 'playful' | 'footer' | 'title', SketchKind[]> = {
  garden: ['sprig', 'dots', 'star', 'leaves', 'rays', 'loop', 'sparkles', 'splash'],
  notes: ['sparkles', 'rays', 'dots', 'loop', 'sprig', 'star', 'zigzag', 'leaves'],
  playful: ['ribbon', 'star', 'sprig', 'rays', 'dots', 'zigzag', 'loop', 'splash'],
  title: ['ribbon', 'dots', 'sprig', 'rays', 'loop', 'leaves', 'splash', 'zigzag', 'sparkles', 'star'],
  footer: [
    'ribbon', 'star', 'sprig', 'rays', 'dots', 'zigzag', 'loop', 'splash',
    'loop', 'leaves', 'sparkles', 'dots', 'sparkles', 'rays', 'sprig', 'star',
  ],
};

interface SketchScatterProps {
  arrangement?: keyof typeof arrangements;
  className?: string;
}

/** Small motifs in the gutters and open space, never over text or controls. */
export function SketchScatter({ arrangement = 'garden', className }: SketchScatterProps) {
  return (
    <div className={['sketch-scatter', `sketch-scatter-${arrangement}`, className].filter(Boolean).join(' ')} aria-hidden="true">
      {arrangements[arrangement].map((kind, index) => (
        <SketchAccent key={`${kind}-${index}`} kind={kind} className={`sketch-slot-${index + 1}`} />
      ))}
    </div>
  );
}
