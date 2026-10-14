import { TypewriterText } from './TypewriterText';

interface TypewriterHeadingProps {
  id: string;
  text: string;
  /** Milliseconds per character. */
  speed?: number;
}

/**
 * A heading that types itself once when it first enters view. The complete text
 * is always present for assistive technology; the typed copy is aria-hidden and
 * keeps the untyped remainder in place (invisible) so the layout never shifts.
 */
export function TypewriterHeading({ id, text, speed = 40 }: TypewriterHeadingProps) {
  return <TypewriterText as="h2" id={id} text={text} speed={speed} />;
}
