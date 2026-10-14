import type { CSSProperties } from 'react';
import { useMotionAllowed } from '../motion/motion';
import { BrandLockup } from './BrandLockup';
import { SketchAccent, type SketchKind } from './SketchAccent';
import './LandingVisual.css';

interface LandingPiece {
  kind: SketchKind;
  x: number;
  y: number;
  turn: number;
  size: number;
}

const pieces: LandingPiece[] = [
  { kind: 'sprig', x: 12, y: 17, turn: 18, size: 6 },
  { kind: 'ribbon', x: 91, y: 12, turn: 12, size: 7.5 },
  { kind: 'dots', x: 7, y: 49, turn: -12, size: 4.5 },
  { kind: 'rays', x: 65, y: 10, turn: -15, size: 4 },
  { kind: 'star', x: 79, y: 29, turn: 8, size: 3 },
  { kind: 'sparkles', x: 20, y: 70, turn: -8, size: 3.5 },
  { kind: 'leaves', x: 89, y: 82, turn: -8, size: 7 },
  { kind: 'loop', x: 12, y: 89, turn: -12, size: 6 },
  { kind: 'zigzag', x: 49, y: 88, turn: 8, size: 5 },
  { kind: 'splash', x: 73, y: 88, turn: 15, size: 5.5 },
];

/** A once-only brand reveal. The sketches leave the viewport; the logo never leaves. */
export function LandingVisual() {
  const motionAllowed = useMotionAllowed();

  return (
    <div className="home-hero-scene" data-landing-motion={motionAllowed ? 'intro' : 'static'}>
      <div className="landing-pieces" aria-hidden="true">
        {pieces.map((piece, index) => {
          const dx = piece.x - 50;
          const dy = piece.y - 50;
          const distance = Math.max(Math.abs(dx), Math.abs(dy), 1);
          return (
            <span
              key={piece.kind}
              className={`landing-piece${index % 3 === 1 ? ' landing-piece-rose' : ''}`}
              style={{
                '--piece-x': `${piece.x}%`,
                '--piece-y': `${piece.y}%`,
                '--piece-turn': `${piece.turn}deg`,
                '--piece-size': `${piece.size}rem`,
                '--piece-delay': `${1.7 + index * 0.055}s`,
                '--piece-exit-x': `${dx / distance * 120}vw`,
                '--piece-exit-y': `${dy / distance * 120}vh`,
              } as CSSProperties}
            >
              <SketchAccent kind={piece.kind} />
            </span>
          );
        })}
      </div>
      <h1 id="home-title" className="home-title">
        <BrandLockup tone="white" animateMark />
      </h1>
    </div>
  );
}
