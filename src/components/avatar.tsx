import Image from 'next/image';
import { profile } from '@/content/profile';

interface Props {
  /** Size, shape and initials font size, e.g. "size-16 rounded-2xl text-2xl". */
  className: string;
  sizes: string;
  /** Empty when the name is printed right next to the picture. */
  alt: string;
  priority?: boolean;
}

/** Faiz's photo once `profile.photo` is set; until then his initials "FA" on the paper surface (decorative). */
export function Avatar({ className, sizes, alt, priority }: Props) {
  if (profile.photo) {
    return (
      <span className={`avatar ${className}`}>
        <Image src={profile.photo} alt={alt} fill sizes={sizes} priority={priority} />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`avatar ${className}`}>
      FA
    </span>
  );
}
