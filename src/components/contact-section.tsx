import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { whatsappUrl } from '@/lib/contact';
import { WhatsAppIcon } from './whatsapp-icon';

/** The closing call to action, shared by the home page and every service, local, FAQ and article page. */
export async function ContactSection() {
  const t = await getTranslations('contact');
  const wa = whatsappUrl(t('waMessage'));

  return (
    <section id="contact" className="section bg-invert text-on-invert" aria-labelledby="contact-title" data-contact-zone>
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

        <div className="mt-14 border-t border-on-invert/20 pt-10 md:mt-24">
          {/* WhatsApp first and most prominent: it is how most clients here get in touch (Von Restorff). */}
          <a href={wa} target="_blank" rel="noreferrer" className="btn bg-invert-accent text-invert" data-magnetic>
            <WhatsAppIcon />
            <span className="roll" data-label={t('whatsapp')}>
              <span>{t('whatsapp')}</span>
            </span>
          </a>
          <p className="mt-10 font-semibold text-on-invert/70">{t('emailLabel')}</p>
          <a
            href={`mailto:${profile.email}`}
            className="tap-area mt-3 inline-block font-display text-[clamp(1.35rem,6.2vw,4.5rem)] font-bold leading-tight text-invert-accent no-underline [overflow-wrap:anywhere]"
          >
            <span className="roll" data-label={profile.email}>
              <span>{profile.email}</span>
            </span>
          </a>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 text-sm">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link tap-area inline-block py-2 text-on-invert/80">
                {t('github')}
              </a>
            </li>
            {profile.linkedin ? (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link tap-area inline-block py-2 text-on-invert/80">
                  {t('linkedin')}
                </a>
              </li>
            ) : null}
            {profile.cv ? (
              <li>
                <a href={profile.cv} download className="link tap-area inline-block py-2 text-on-invert/80">
                  {t('cv')}
                </a>
              </li>
            ) : null}
          </ul>
          <p className="mt-10 font-display text-xl font-bold text-on-invert/90">{t('signoff')}</p>
        </div>
      </div>
    </section>
  );
}
