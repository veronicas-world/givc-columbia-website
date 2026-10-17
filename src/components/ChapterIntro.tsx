import { useRef } from 'react';
import { chapterIntro } from '../content/chapter';
import { homePhotos } from '../content/photos';
import { useInViewOnce, useMotionAllowed } from '../motion/motion';
import { Photo } from './Photo';

export function ChapterIntro() {
  const ref = useRef<HTMLElement>(null);
  const animate = useMotionAllowed();
  const entered = useInViewOnce(ref, animate, 0.2);
  const visible = !animate || entered;

  return (
    <section
      id="chapter"
      ref={ref}
      className="home-intro"
      aria-labelledby="intro-title"
      data-intro="true"
      data-intro-state={visible ? 'entered' : 'waiting'}
    >
      <div className="home-intro-copy">
        <h2 id="intro-title">About us</h2>
        <p className="home-description">{chapterIntro}</p>
      </div>
      <Photo photo={homePhotos.introGroup} className="home-intro-photo" />
    </section>
  );
}
