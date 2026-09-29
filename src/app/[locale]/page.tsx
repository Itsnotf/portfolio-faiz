import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ApproachSection } from '@/components/approach-section';
import { ArchiveSection } from '@/components/archive-section';
import { CaseGallery } from '@/components/case-gallery';
import { ContactSection } from '@/components/contact-section';
import { Hero } from '@/components/hero';
import { JsonLd } from '@/components/json-ld';
import { education, experience, profile, recognition, services } from '@/content/profile';
import { serviceByKey } from '@/content/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { graph, person, professionalService, website } from '@/lib/structured-data';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={graph(website(locale), person(locale), professionalService(locale))} />
      <Hero />

      {/* Services straight after the opening: what a visitor most needs to know comes first (serial position). */}
      <section id="services" className="section border-t border-garis" aria-labelledby="services-title">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <div className="md:col-span-7">
              <p className="eyebrow">{t('servicesSection.eyebrow')}</p>
              <h2 id="services-title" className="h-section mt-5" data-split>
                {t('servicesSection.title')}
              </h2>
            </div>
            <p className="lead md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal>
              {t('servicesSection.intro')}
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.key} data-reveal={i * 0.08}>
                <article className="card relative flex h-full flex-col rounded-[20px] border border-garis bg-lembar p-5 md:p-6">
                  <h3 className="font-display text-xl font-bold">
                    <Link
                      href={{ pathname: '/services/[slug]', params: { slug: serviceByKey(s.key).slug[locale] } }}
                      className="no-underline after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
                    >
                      {s.title[locale]}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.975rem] text-tinta-muda">{s.body[locale]}</p>
                  <span aria-hidden="true" className="link mt-auto self-start pt-4 text-sm font-semibold text-stempel">
                    {t('about.more')}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ApproachSection locale={locale} />
      <CaseGallery locale={locale} />
      <ArchiveSection />

      <section id="about" className="section border-t border-garis" aria-labelledby="about-title">
        <div className="wrap">
          <div className="grid-12 gap-y-8">
            <div className="md:col-span-6">
              <p className="eyebrow">
                {t('about.eyebrow')}
              </p>
              <h2 id="about-title" className="h-section mt-5" data-split>
                {t('about.title')}
              </h2>
              {profile.photo ? (
                <Image src={profile.photo} alt={profile.name} width={640} height={800} className="mt-10 w-full max-w-[18rem] rounded-2xl" />
              ) : null}
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-12" data-reveal>
              <p className="text-lg">{t('about.body1')}</p>
              <p className="mt-4 text-lg">{t('about.body2')}</p>
              {profile.cv ? (
                <a href={profile.cv} download className="link mt-6 inline-block font-semibold">
                  {t('about.cv')}
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid-12 mt-16 gap-y-14 md:mt-20">
            <div className="md:col-span-7">
              <h3 className="text-2xl">{t('about.experience')}</h3>
              <ol className="mt-6 border-l-2 border-tinta/15">
                {experience.map((e) => (
                  <li key={e.org + e.period.en} className="relative pb-8 pl-6 last:pb-0" data-reveal>
                    <span aria-hidden="true" className="absolute -left-[7px] top-2 size-3 rounded-full border-2 border-kertas bg-stempel" />
                    <p className="text-sm text-tinta-muda">{e.period[locale]}</p>
                    <p className="mt-1 font-semibold">
                      {e.role[locale]}, {e.org}
                    </p>
                    <p className="mt-1 text-tinta-muda">{e.body[locale]}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <h3 className="text-2xl">{t('about.education')}</h3>
              <p className="mt-6 font-semibold">{education.degree[locale]}</p>
              <p className="text-tinta-muda">
                {education.school}, {education.period}. {education.gpa[locale]}
              </p>

              <h3 className="mt-12 text-2xl">{t('about.recognition')}</h3>
              <ul className="mt-6 space-y-4">
                {recognition.map((r) => (
                  <li key={r.title.en}>
                    <p className="font-semibold">{r.title[locale]}</p>
                    <p className="text-tinta-muda">{r.detail[locale]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
