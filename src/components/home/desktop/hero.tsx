import { getTranslations } from 'next-intl/server';
import { Avatar } from '@/components/avatar';
import { ProofList } from '@/components/proof-list';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { hero, profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';
import { whatsappUrl } from '@/lib/contact';

/**
 * Personal opening: who Faiz is and what he builds, in plain words, with short proof and two next steps.
 * Nothing here waits for JavaScript; the H1 is the largest element on screen, so it is never animated.
 */
export async function DesktopHero({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <section className="pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="hero-title">
      <div className="wrap grid-12 items-center gap-y-12">
        <div className="md:col-span-7">
          <h1 id="hero-title">
            <span className="hero-greeting block">{hero.greeting[locale]}</span>
            <span className="hero-headline mt-4 block">{hero.headline[locale]}</span>
          </h1>
          <p className="lead measure mt-6">{hero.sub[locale]}</p>
          <ProofList locale={locale} label={t('hero.proofLabel')} variant="strip" className="mt-9" />
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="#work" data-magnetic>
              <span className="roll" data-label={t('hero.work')}>
                <span>{t('hero.work')}</span>
              </span>
            </a>
            <a className="btn btn-secondary" href={whatsappUrl(t('contact.waMessage'))} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              <span className="roll" data-label={t('contact.whatsapp')}>
                <span>{t('contact.whatsapp')}</span>
              </span>
            </a>
          </div>
        </div>

        {/* An ID card in the paper-form style of the site: photo (or initials), name and where he works from. */}
        <div className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="id-card mx-auto max-w-[22rem] rounded-[20px] border border-garis bg-lembar p-3 md:max-w-none" data-reveal>
            <Avatar className="aspect-[4/5] w-full rounded-[14px] text-[clamp(4rem,9vw,7rem)]" sizes="(min-width: 1024px) 22rem, (min-width: 768px) 40vw, 22rem" alt={t('hero.photoAlt')} priority />
            <div className="px-2 pb-2 pt-4">
              <p className="font-display text-xl font-bold [font-stretch:105%]">{profile.name}</p>
              <p className="mt-1 text-[0.95rem] text-tinta-muda">{t('hero.based')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
