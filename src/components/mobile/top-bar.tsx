import { getLocale, getTranslations } from 'next-intl/server';
import { Avatar } from '@/components/avatar';
import { LanguageSwitch } from '@/components/language-switch';
import { ThemeToggle } from '@/components/theme-toggle';
import { profile } from '@/content/profile';
import { Link } from '@/i18n/navigation';

/** Phone header: who this is, plus language and theme. Navigation lives in the tab bar at the bottom. */
export async function MobileTopBar() {
  const t = await getTranslations('nav');
  const target = (await getLocale()) === 'en' ? 'id' : 'en';

  return (
    <header className="m-topbar">
      <div className="wrap flex items-center justify-between gap-3">
        <Link href="/" className="tap-area flex min-w-0 items-center gap-2.5 no-underline">
          <Avatar className="size-9 rounded-xl text-[0.8rem]" sizes="36px" alt="" />
          <span className="font-display text-[0.95rem] font-bold leading-[1.1] [font-stretch:105%]">{profile.name}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle labels={{ dark: t('themeDark'), light: t('themeLight') }} />
          <LanguageSwitch label={t('language')} short={t('languageShort')} target={target} />
        </div>
      </div>
    </header>
  );
}
