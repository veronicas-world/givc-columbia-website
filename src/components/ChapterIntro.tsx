import { useRef } from 'react';
import { chapterIntro } from '../content/chapter';
import { homePhotos } from '../content/photos';
import { useInViewOnce, useMotionAllowed } from '../motion/motion';
import { TypewriterText } from '../motion/TypewriterText';
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
        <h2 id="intro-title" className="visually-hidden">About the chapter</h2>
        <TypewriterText text={chapterIntro} className="home-description" active={visible} />
      </div>
      <Photo photo={homePhotos.introGroup} className="home-intro-photo" />
    </section>
  );
}
