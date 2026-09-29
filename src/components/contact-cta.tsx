import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { whatsappUrl } from '@/lib/contact';
import { WhatsAppIcon } from './whatsapp-icon';

/**
 * A short contact block for the end of a case study. The reader has just seen proof of a problem like theirs,
 * which is the best moment to offer the next step (peak-end rule).
 */
export async function ContactCta() {
  const t = await getTranslations('contact');

  return (
    <section className="wrap mt-20" aria-labelledby="similar-title" data-contact-zone>
      <div className="rounded-[20px] bg-invert p-6 text-on-invert md:p-10">
        <h2 id="similar-title" className="text-[clamp(1.75rem,4vw,2.6rem)]">
          {t('similarTitle')}
        </h2>
        <p className="measure mt-3 text-on-invert/85">{t('similarBody')}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={whatsappUrl(t('waMessage'))} target="_blank" rel="noreferrer" className="btn bg-invert-accent text-invert">
            <WhatsAppIcon />
            {t('whatsapp')}
          </a>
          <a href={`mailto:${profile.email}`} className="link tap-area inline-block py-2 font-semibold text-on-invert">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
