import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';

/** The closing call to action, shared by the home page and every service, local and FAQ page. */
export async function ContactSection() {
  const t = await getTranslations('contact');
  const wa = `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`;

  return (
    <section id="contact" className="section bg-invert text-on-invert" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="md:col-span-7">
            <p className="eyebrow text-on-invert/70">{t('eyebrow')}</p>
            <h2 id="contact-title" className="h-section mt-5" data-split>
              {t('title')}
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-12" data-reveal>
            <p className="text-lg text-on-invert/85">{t('body')}</p>
            <ol className="mt-5 space-y-3">
              {(['prompt1', 'prompt2', 'prompt3'] as const).map((k, i) => (
                <li key={k} className="flex gap-3">
                  <span className="font-display font-bold text-invert-accent">{i + 1}</span>
                  <span className="text-on-invert/85">{t(k)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 border-t border-on-invert/20 pt-10 md:mt-24">
          <p className="font-semibold text-on-invert/70">{t('emailLabel')}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block break-all font-display text-[clamp(1.7rem,5.6vw,5rem)] font-bold leading-none text-invert-accent no-underline"
          >
            <span className="roll" data-label={profile.email}>
              <span>{profile.email}</span>
            </span>
          </a>
          <ul className="mt-10 flex flex-wrap items-center gap-3">
            <li>
              <a href={wa} target="_blank" rel="noreferrer" className="btn bg-invert-accent text-invert" data-magnetic>
                <span className="roll" data-label={t('whatsapp')}>
                  <span>{t('whatsapp')}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary text-on-invert hover:bg-on-invert hover:text-invert">
                {t('github')}
              </a>
            </li>
            {profile.linkedin ? (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary text-on-invert hover:bg-on-invert hover:text-invert">
                  {t('linkedin')}
                </a>
              </li>
            ) : null}
            {profile.cv ? (
              <li>
                <a href={profile.cv} download className="link ml-2 font-semibold text-on-invert">
                  {t('cv')}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
