import { getTranslations } from 'next-intl/server';
import { Avatar } from '@/components/avatar';
import { ProofList } from '@/components/proof-list';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { hero } from '@/content/profile';
import type { Locale } from '@/i18n/routing';
import { whatsappUrl } from '@/lib/contact';

/**
 * Phone opening, sized so both buttons sit above the fold on a 390×844 screen: photo and role (the name is in the top
 * bar), the same H1 as desktop, one sentence, two buttons, then the short proof. No animation: the H1 is the largest
 * element on screen.
 */
export async function MobileHero({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <section className="pb-12 pt-[calc(var(--header-h)+1.5rem)]" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 rounded-2xl text-xl" sizes="64px" alt={t('hero.photoAlt')} priority />
          <p className="min-w-0 text-[0.95rem] font-semibold leading-snug text-tinta-muda">{t('hero.based')}</p>
        </div>
        <h1 id="hero-title" className="mt-6">
          <span className="block text-[clamp(2.1rem,10vw,2.6rem)] font-[760] leading-none tracking-[-0.02em] [font-stretch:105%]">{hero.greeting[locale]}</span>
          <span className="mt-3 block text-[clamp(1.35rem,6vw,1.6rem)] leading-[1.15]">{hero.headline[locale]}</span>
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-tinta-muda">{hero.sub[locale]}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a className="btn btn-primary min-w-[9rem] flex-1 justify-center" href="#work">
            {t('hero.work')}
          </a>
          <a className="btn btn-secondary min-w-[9rem] flex-1 justify-center" href={whatsappUrl(t('contact.waMessage'))} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            {t('contact.float')}
          </a>
        </div>
        <ProofList locale={locale} label={t('hero.proofLabel')} variant="stack" className="mt-9" />
      </div>
    </section>
  );
}
