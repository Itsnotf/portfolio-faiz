'use client';

import { Fragment, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { hero } from '@/content/profile';
import type { Locale } from '@/i18n/routing';
import { gsap, motionOn, ScrollTrigger, useGSAP } from './motion/gsap';

// Deterministic "randomness" so server and client render the same scattered offsets.
function scatter(i: number) {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    '--wx': `${Math.round((r(1) - 0.5) * 18)}vw`,
    '--wy': `${Math.round((r(2) - 0.5) * 22)}vh`,
    '--wr': `${Math.round((r(3) - 0.5) * 34)}deg`,
    '--wdth-messy': `${Math.round(55 + r(4) * 90)}%`,
  } as React.CSSProperties;
}

const panelScatter: Record<string, React.CSSProperties> = {
  main: { '--sx': '-4vw', '--sy': '6vh', '--sr': '-6deg' } as React.CSSProperties,
  queue: { '--sx': '5vw', '--sy': '-9vh', '--sr': '8deg' } as React.CSSProperties,
  data: { '--sx': '-4vw', '--sy': '-14vh', '--sr': '-11deg' } as React.CSSProperties,
  status: { '--sx': '3vw', '--sy': '11vh', '--sr': '-16deg' } as React.CSSProperties,
  history: { '--sx': '3vw', '--sy': '10vh', '--sr': '10deg' } as React.CSSProperties,
};

export function Hero() {
  const locale = useLocale() as Locale;
  const t = useTranslations('fragments');
  const th = useTranslations('hero');
  const root = useRef<HTMLElement>(null);
  const words = hero.headline[locale].split(' ');

  useGSAP(
    () => {
      // Tells the inline failsafe in the layout that the script arrived.
      root.current?.setAttribute('data-ready', '');
      if (!motionOn()) return;
      const q = gsap.utils.selector(root);

      const build = () =>
        gsap
          .timeline({ defaults: { ease: 'power2.inOut' } })
          .to(q('.hero-hint'), { autoAlpha: 0, duration: 0.15 }, 0)
          .to(q('.word'), { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, '--wdth-messy': '100%', duration: 0.7, stagger: { each: 0.025, from: 'random' } }, 0)
          .to(q('.panel'), { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, duration: 0.7, stagger: 0.06 }, 0.1)
          .to(q('.panel'), { '--pb': 1, duration: 0.3 }, 0.55)
          .to(q('.board-sheet'), { opacity: 1, duration: 0.3 }, 0.55)
          .to(q('.face-messy'), { opacity: 0, duration: 0.25, stagger: 0.04 }, 0.6)
          .to(q('.face-clean'), { opacity: 1, duration: 0.3, stagger: 0.04 }, 0.65);

      const mm = gsap.matchMedia();
      // Wide screens: the visitor tidies the page by scrolling through a pinned hero.
      // ScrollSmoother already smooths the scroll, so the scrub is direct (no second layer of lag).
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          animation: build(),
        });
      });
      // Phones and tablets: the stacked hero is taller than the screen and pinning fights the browser
      // chrome, so the page tidies itself once, shortly after load.
      mm.add('(max-width: 1023px)', () => {
        build().timeScale(0.6).delay(0.5);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero relative flex items-center pb-16 pt-[calc(var(--header-h)+2rem)] lg:min-h-svh lg:pb-10">
      <div className="wrap grid-12 items-center gap-y-12">
        <div className="md:col-span-12 lg:col-span-7">
          {/* A plain description above the headline, so a first-time visitor knows what this is without a sales pitch. */}
          {/* Sits above the scattered words, so it stays readable while the headline is still messy. */}
          <p className="eyebrow relative z-10 -ml-3 mb-4 w-fit rounded-full bg-kertas/90 px-3 py-1">{th('label')}</p>
          <h1 className="hero-headline">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="word" style={scatter(i)} data-w={w}>
                  <span className="word-ink">{w}</span>
                </span>
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          <p className="lead measure mt-7">{hero.sub[locale]}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="#contact" data-magnetic>
              <span className="roll" data-label={th('primary')}>
                <span>{th('primary')}</span>
              </span>
            </a>
            <a className="btn btn-secondary" href="#approach">
              <span className="roll" data-label={th('secondary')}>
                <span>{th('secondary')}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="md:col-span-10 lg:col-span-5" aria-hidden="true">
          <div className="board">
            <div className="board-sheet" />

            <div className="panel panel-main" style={panelScatter.main}>
              <div className="face-clean flex h-full flex-col">
                <p className="text-sm text-tinta-muda">{t('mainTitle')}</p>
                <p className="mt-1 font-display text-4xl font-bold [font-stretch:110%]">{t('mainValue')}</p>
                <div className="mt-auto space-y-2 pt-6">
                  {(
                    [
                      ['bg-tinta', 92],
                      ['bg-stempel', 38],
                      ['bg-merah-muda', 20],
                    ] as const
                  ).map(([c, w], i) => (
                    <div key={i} className="h-2 rounded-full bg-kertas">
                      <div className={`h-2 rounded-full ${c}`} style={{ width: `${w}%` }} />
                    </div>
                  ))}
                  <p className="pt-1 text-[0.8125rem] text-tinta-muda">{t('mainNote')}</p>
                </div>
              </div>
              <div className="face-messy">
                <div className="paper left-[4%] top-[8%] w-[92%] -rotate-1">
                  <p className="border-b border-[#d7dde0] bg-[#e9f4ec] px-2 py-1 text-[0.7rem] font-semibold">{t('sheetTitle')}</p>
                  <div className="sheet-grid">
                    <span>{t('rowA')}</span><span>12.750.000</span><span>1.150.000</span><span>—</span>
                    <span>{t('rowB')}</span><span>9.600.000</span><span className="bg-kuning/60">#VALUE!</span><span>2jt?</span>
                    <span>{t('rowC')}</span><span className="bg-kuning/60">??</span><span>390.000</span><span />
                    <span>{t('rowD')}</span><span>7.250.000</span><span>150.000</span><span className="text-danger">-1.000.000</span>
                    <span className="font-semibold">{t('sheetTotal')}</span><span className="col-span-2 bg-merah-muda/50">#REF!</span><span />
                  </div>
                </div>
              </div>
            </div>

            <div className="panel panel-queue" style={panelScatter.queue}>
              <div className="face-clean flex h-full flex-col">
                <p className="text-sm text-tinta-muda">{t('queueTitle')}</p>
                <p className="mt-1 font-display text-4xl font-bold [font-stretch:110%]">{t('queueValue')}</p>
                <div className="mt-4 grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 18 }, (_, i) => (
                    <span key={i} className={`size-3 rounded-full ${i < 15 ? 'bg-tinta' : 'border-2 border-stempel'}`} />
                  ))}
                </div>
                <p className="mt-auto pt-4 text-[0.8125rem] text-tinta-muda">{t('queueNote')}</p>
              </div>
              <div className="face-messy">
                <div className="paper inset-x-[5%] top-[5%] bottom-[5%] flex flex-col gap-1.5 rounded-lg bg-[#ece5dd] p-2.5">
                  <p className="text-[0.68rem] font-semibold">{t('chatTitle')}</p>
                  <p className="bubble">{t('chat1')}</p>
                  <p className="bubble bubble-out">{t('chat2')}</p>
                  <p className="bubble">{t('chat3')}</p>
                  <p className="bubble bubble-out">{t('chat4')}</p>
                </div>
              </div>
            </div>

            <div className="panel panel-data" style={panelScatter.data}>
              <div className="face-clean">
                <p className="text-sm text-tinta-muda">{t('dataTitle')}</p>
                <p className="mt-1 font-display text-xl font-bold [font-stretch:110%]">{t('dataValue')}</p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span
                      key={i}
                      className={`h-2 flex-1 rounded-sm ${i < 4 ? 'bg-stempel' : 'bg-[repeating-linear-gradient(135deg,var(--accent)_0_2px,transparent_2px_5px)] opacity-60'}`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[0.8125rem] text-tinta-muda">{t('dataNote')}</p>
              </div>
              <div className="face-messy">
                <p className="paper note left-[2%] top-[6%] w-[62%] rotate-[-4deg] bg-kuning text-sm">{t('sticky1')}</p>
                <p className="paper note right-[0%] bottom-[2%] w-[58%] rotate-[5deg] bg-merah-muda text-sm">{t('sticky2')}</p>
              </div>
            </div>

            <div className="panel panel-status" style={panelScatter.status}>
              <div className="face-clean">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stempel/10 px-3 py-1 text-sm font-semibold text-stempel">
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                  {t('status')}
                </span>
                <p className="mt-3 text-[0.8125rem] text-tinta-muda">{t('statusNote')}</p>
              </div>
              <div className="face-messy">
                <div className="paper stamp left-[10%] top-[18%] h-[62%] w-[80%] rotate-[-9deg] text-lg">{t('stamp')}</div>
              </div>
            </div>

            <div className="panel panel-history" style={panelScatter.history}>
              <div className="face-clean">
                <p className="text-sm text-tinta-muda">{t('historyTitle')}</p>
                <p className="mt-1 font-display text-xl font-bold [font-stretch:110%]">{t('historyValue')}</p>
                <div className="mt-3 h-2 rounded-full bg-kertas">
                  <div className="h-2 w-full rounded-full bg-tinta" />
                </div>
                <p className="mt-2 text-[0.8125rem] text-tinta-muda">{t('historyNote')}</p>
              </div>
              <div className="face-messy">
                <div className="paper receipt left-[14%] top-[2%] w-[72%] rotate-[4deg]">
                  <p className="border-b border-dotted border-[#1e2a4a]/40 pb-1 font-semibold">NOTA</p>
                  <p className="mt-2 italic">{t('receipt')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="hero-hint pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-sm text-tinta-muda [html.motion_&]:lg:block">
        {th('hint')}
      </p>
    </section>
  );
}
