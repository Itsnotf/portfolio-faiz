import type { Locale } from '@/i18n/routing';
import type { ServiceKey } from './services';

export type Localized = Record<Locale, string>;

export const profile = {
  name: 'Faiz Aflah Hafizuddin',
  shortName: 'Faiz',
  location: { id: 'Palembang, Indonesia', en: 'Palembang, Indonesia' } satisfies Localized,
  email: 'faizaflah009@gmail.com',
  whatsapp: '+62 895 1307 8184',
  github: 'https://github.com/Itsnotf',
  // Faiz has no LinkedIn yet. The contact section and the Person schema show it only when this is set.
  linkedin: null as string | null,
  // TODO(Faiz): the CV in Documents is outdated (semester 5, GPA 3.66). Put an up-to-date PDF at
  // /public/cv/cv-faiz-aflah-hafizuddin.pdf and set this to '/cv/cv-faiz-aflah-hafizuddin.pdf'.
  cv: null as string | null,
  // TODO(Faiz): add a photo at /public/photo.jpg and set this to '/photo.jpg'. Clients like to see who they will work with.
  photo: null as string | null,
  languages: { id: 'Indonesia dan Inggris', en: 'Indonesian and English' } satisfies Localized,
  serves: { id: 'Palembang, seluruh Indonesia, dan jarak jauh', en: 'Palembang, across Indonesia and remotely' } satisfies Localized,
  jobTitle: {
    id: 'Software engineer untuk sistem operasional bisnis',
    en: 'Software engineer for business operations systems',
  } satisfies Localized,
  /**
   * The one standard bio, used word for word on the site (article author box, llms.txt) and on every outside profile,
   * so search engines and AI assistants recognise the same person everywhere.
   */
  bio: {
    id: 'Faiz Aflah Hafizuddin adalah software engineer di Palembang yang membangun sistem informasi, aplikasi web dan mobile, serta fitur AI untuk kebutuhan bisnis. Saat ini ia bekerja sebagai software developer di Loranet Technologies PLT, Malaysia, sambil menjalankan Berkala Digital, agensi digital kreatif yang ia dirikan di Palembang pada 2025. Ia melayani klien di Palembang, seluruh Indonesia, dan jarak jauh, dalam bahasa Indonesia maupun Inggris.',
    en: 'Faiz Aflah Hafizuddin is a software engineer based in Palembang, Indonesia, who builds custom business systems, web and mobile apps, and AI features for businesses. Currently a software developer at Loranet Technologies PLT in Malaysia and the founder of Berkala Digital, a creative digital agency started in Palembang in 2025. Works with clients in Palembang, across Indonesia and remotely, in Indonesian and English.',
  } satisfies Localized,
};

/** The opening of the home page. The H1 is `greeting` + `headline`; the home share image uses the same text. */
export const hero = {
  greeting: { id: 'Halo, saya Faiz.', en: 'Hi, I’m Faiz.' } satisfies Localized,
  headline: {
    id: 'Saya membuat aplikasi dan sistem informasi untuk bisnis.',
    en: 'I build custom software and web apps for businesses.',
  } satisfies Localized,
  sub: {
    id: 'Pekerjaan yang masih berjalan di Excel, kertas, atau grup chat saya ubah menjadi aplikasi rapi yang benar-benar dipakai timmu.',
    en: 'I take work that still runs on spreadsheets, paper or group chats and turn it into a tidy app your team actually uses.',
  } satisfies Localized,
  // TODO(Faiz): an availability line ("Sedang menerima proyek baru") can go here once you confirm you have room for new work.
};

/**
 * Short proof under the hero, in the words a business owner understands. Facts mirror `recognition` and `experience`
 * below, so keep them in sync. `desktopOnly` items are left out of the shorter phone hero.
 */
export const proof: { label: Localized; detail: Localized; slug?: string; desktopOnly?: boolean }[] = [
  {
    // TODO(Faiz): confirm how KMIPN should be described.
    label: { id: 'Dua kali finalis nasional KMIPN', en: 'Twice a national finalist at KMIPN' },
    detail: { id: 'Lomba informatika politeknik tingkat nasional, 2023 dan 2026', en: 'National polytechnic IT competition, 2023 and 2026' },
  },
  {
    label: { id: 'Software developer di Loranet Technologies PLT', en: 'Software developer at Loranet Technologies PLT' },
    detail: { id: 'Malaysia, sejak Juni 2026', en: 'Malaysia, since June 2026' },
  },
  {
    label: { id: 'Pendiri Berkala Digital', en: 'Founder of Berkala Digital' },
    detail: { id: 'Agensi digital di Palembang, sejak 2025', en: 'Digital agency in Palembang, since 2025' },
  },
  {
    label: { id: 'Sistem penggajian buatan saya dipakai klien', en: 'A payroll system I built is in use by a client' },
    detail: { id: 'SIPEG', en: 'SIPEG' },
    slug: 'sipeg',
    desktopOnly: true,
  },
];

/**
 * How I approach any problem. `title` and `body` are the full wording (service pages, llms.txt); `plain` is the
 * one-line version for the home page. Each step points at a real decision inside a case study.
 */
export interface Principle {
  title: Localized;
  body: Localized;
  plain: Localized;
  example: { label: Localized; slug: string; decision: string };
}

export const principles: Principle[] = [
  {
    title: { id: 'Pahami alur yang benar-benar berjalan', en: 'Learn how the work really flows' },
    body: {
      id: 'SOP jarang sama dengan kenyataan. Saya duduk bersama orang yang akan memakai sistemnya, melihat file, chat, dan catatan yang mereka pakai sekarang, lalu memetakan alurnya, termasuk jalan pintas yang tidak pernah tertulis.',
      en: 'Written procedures rarely match reality. I sit with the people who will use the system, look at the files, chats and notes they rely on today, and map the flow, including the shortcuts nobody wrote down.',
    },
    plain: {
      id: 'Saya melihat langsung file, chat, dan catatan yang dipakai timmu sekarang, termasuk jalan pintas yang tidak pernah tertulis.',
      en: 'I look at the files, chats and notes your team uses today, including the shortcuts nobody wrote down.',
    },
    example: { label: { id: 'Tanggal gajian per kontrak di SIPEG', en: 'Per-contract paydays in SIPEG' }, slug: 'sipeg', decision: 'pro-rata' },
  },
  {
    title: { id: 'Tulis aturannya, termasuk pengecualiannya', en: 'Write the rules down, exceptions included' },
    body: {
      id: 'Sistem yang akurat lahir dari aturan yang jelas. Saya menuliskan setiap aturan bisnis beserta pengecualiannya, dan memastikan kasus-kasus aneh sudah punya jawaban sebelum ada satu baris kode.',
      en: 'Accurate systems come from explicit rules. I write down every business rule with its exceptions and make sure the odd cases have an answer before a line of code exists.',
    },
    plain: {
      id: 'Kasus-kasus aneh sudah punya jawaban sebelum aplikasinya dibuat, jadi hasilnya tidak mengejutkan.',
      en: 'The odd cases have an answer before the app is built, so the results hold no surprises.',
    },
    example: {
      label: { id: 'Data kosong bukan berarti gagal di ALBATROS', en: 'Missing data is not a failure in ALBATROS' },
      slug: 'albatros',
      decision: 'unknown-not-failed',
    },
  },
  {
    title: { id: 'Pilih solusi paling sederhana yang cukup', en: 'Choose the simplest thing that is enough' },
    body: {
      id: 'Setiap teknologi tambahan adalah satu hal lagi yang bisa rusak dan harus dirawat. Saya memilih berdasarkan masalahnya, bukan tren, dan menambah kerumitan hanya ketika alasannya bisa dijelaskan.',
      en: 'Every extra piece of technology is one more thing to break and maintain. I choose based on the problem, not on trends, and add complexity only when I can explain why.',
    },
    plain: {
      id: 'Setiap tambahan teknologi adalah satu hal lagi yang bisa rusak, jadi saya pakai yang paling sederhana yang cukup.',
      en: 'Every extra piece of technology is one more thing to break, so I use the simplest thing that is enough.',
    },
    example: {
      label: { id: 'Satu tempat data untuk semuanya di ALBATROS', en: 'One database for everything in ALBATROS' },
      slug: 'albatros',
      decision: 'one-database',
    },
  },
  {
    title: { id: 'Buat setiap hasil bisa ditelusuri', en: 'Make every result traceable' },
    body: {
      id: 'Orang baru percaya pada sistem ketika bisa memeriksa hasilnya sendiri. Setiap angka, status, dan perubahan saya buat bisa ditelusuri kembali ke asalnya.',
      en: 'People trust a system when they can check it themselves. Every number, status and change I build can be traced back to where it came from.',
    },
    plain: {
      id: 'Kamu tidak perlu sekadar percaya pada total, karena setiap angka bisa dicek sampai asalnya.',
      en: 'You never have to take a total on trust, because every number can be checked back to its source.',
    },
    example: { label: { id: 'Rincian setiap baris gaji di SIPEG', en: 'Every pay line itemised in SIPEG' }, slug: 'sipeg', decision: 'traceable' },
  },
  {
    title: { id: 'Kunci, uji, lalu serahkan', en: 'Lock it, test it, hand it over' },
    body: {
      id: 'Data yang sudah final tidak boleh berubah diam-diam. Saya mengunci catatan penting, menyediakan alur koreksi yang meninggalkan jejak, menguji aturan bisnisnya, lalu menyerahkan sistem beserta cara merawatnya.',
      en: 'Final data should never change silently. I lock important records, provide a correction flow that leaves a trail, test the business rules, then hand over the system with how to maintain it.',
    },
    plain: {
      id: 'Data yang sudah final tidak bisa berubah diam-diam, dan sistemnya saya serahkan beserta cara merawatnya.',
      en: 'Final data cannot change silently, and I hand the system over with how to look after it.',
    },
    example: {
      label: { id: 'Absensi yang dikunci begitu tercatat', en: 'Attendance locked once recorded' },
      slug: 'face-recognition-attendance',
      decision: 'locked-records',
    },
  },
];

/**
 * Home-page service cards, stated as kinds of problems rather than past domains; each links to its page in
 * src/content/services.ts. `when` is the situation a visitor recognises; `body` is reused wherever a service is listed.
 */
export const services: { key: ServiceKey; title: Localized; when: Localized; body: Localized }[] = [
  {
    key: 'systems',
    title: { id: 'Sistem informasi & laporan', en: 'Business systems & reports' },
    when: {
      id: 'Kalau rekap, perhitungan, dan persetujuan masih lewat Excel atau grup chat',
      en: 'When reports, calculations and approvals still go through spreadsheets or group chats',
    },
    body: {
      id: 'Pencatatan, persetujuan, perhitungan, dan laporan harian yang sekarang masih berjalan di Excel, kertas, atau grup chat.',
      en: 'Daily records, approvals, calculations and reports that still run on spreadsheets, paper or group chats.',
    },
  },
  {
    key: 'apps',
    title: { id: 'Aplikasi web & mobile', en: 'Web & mobile apps' },
    when: {
      id: 'Kalau pelanggan masih harus menghubungi admin, atau tim lapangan mencatat di kertas',
      en: 'When customers still have to message an admin, or field teams write things on paper',
    },
    body: {
      id: 'Website untuk pelanggan, aplikasi pemesanan, dan aplikasi HP untuk tim lapangan, tersambung ke data yang sama dengan sistem di kantor.',
      en: 'Customer websites, ordering apps and phone apps for field teams, connected to the same data as the office system.',
    },
  },
  {
    key: 'ai',
    title: { id: 'AI & otomasi, kalau memang membantu', en: 'AI & automation, where it helps' },
    when: {
      id: 'Kalau ada pekerjaan berulang, atau ide memakai AI yang belum jelas manfaatnya',
      en: 'When there is repetitive work, or an AI idea whose benefit is still unclear',
    },
    body: {
      id: 'Pengenalan wajah, pencarian cerdas, dan pekerjaan yang berjalan otomatis. Saya pakai hanya jika memang membantu, dan saya katakan terus terang jika cara biasa sudah cukup.',
      en: 'Face recognition, smart search and work that runs by itself. I use it only when it genuinely helps, and say so plainly when a simpler way is enough.',
    },
  },
  {
    key: 'fix',
    title: { id: 'Memperbaiki aplikasi yang sudah ada', en: 'Fixing the app you already have' },
    when: {
      id: 'Kalau aplikasi yang ada sering salah hitung atau membingungkan tim',
      en: 'When the app you have keeps getting sums wrong or confusing the team',
    },
    body: {
      id: 'Memperbaiki perhitungan yang sering salah, merapikan tampilan yang membingungkan, dan menambal data yang bolong tanpa menghentikan pekerjaan sehari-hari.',
      en: 'Fixing calculations that keep going wrong, tidying confusing screens and filling data gaps without stopping daily work.',
    },
  },
];

/** Work history, newest first. `short` is the one-line version for the home page timeline. */
export const experience: { period: Localized; role: Localized; org: string; short: Localized; body: Localized }[] = [
  {
    period: { id: 'Jun 2026 – sekarang', en: 'Jun 2026 – present' },
    role: { id: 'Software Developer', en: 'Software Developer' },
    org: 'Loranet Technologies PLT',
    short: { id: 'Menambah fitur di aplikasi web dan HP milik klien perusahaan.', en: 'Building features for the company’s client web and mobile apps.' },
    body: {
      id: 'Pengembang aplikasi di perusahaan teknologi asal Malaysia. Saya mempelajari cara kerja sistem yang sudah berjalan, lalu menambahkan fitur baru untuk aplikasi web dan HP milik klien perusahaan.',
      en: 'Software developer at a Malaysian technology company. I study how existing systems flow, then build new features for web and mobile applications on the company’s client projects.',
    },
  },
  {
    period: { id: 'Okt 2025 – sekarang', en: 'Oct 2025 – present' },
    role: { id: 'Founder & CEO', en: 'Founder & CEO' },
    org: 'Berkala Digital',
    short: { id: 'Memimpin tim kreatif dan tim IT. Tiga klien bisnis di tiga bulan pertama.', en: 'Leading the creative and IT teams. Three business clients in the first three months.' },
    body: {
      id: 'Agensi digital kreatif di Palembang yang tetap saya jalankan paralel dengan pekerjaan saya. Saya menentukan arah, menjalankan proyek dan penjualan, serta mengoordinasikan tim kreatif dan tim IT. Tiga klien bisnis di tiga bulan pertama.',
      en: 'Creative digital agency in Palembang that I keep running alongside my job. I set direction, run projects and sales, and coordinate a creative team and an IT team. Three business clients in the first three months.',
    },
  },
  {
    period: { id: '2024 – 2026', en: '2024 – 2026' },
    role: { id: 'Mentor IT & Akademik', en: 'IT & Academic Mentor' },
    org: 'SINTAK, Politeknik Negeri Sriwijaya',
    short: { id: 'Membimbing mahasiswa junior, tiga tahun berturut-turut.', en: 'Mentoring junior students, three years in a row.' },
    body: {
      id: 'Dipercaya tiga tahun berturut-turut membimbing mahasiswa junior dalam keahlian teknis dan adaptasi akademik.',
      en: 'Chosen three years in a row to mentor junior students on technical skills and campus life.',
    },
  },
  {
    period: { id: '2023 – 2024', en: '2023 – 2024' },
    role: { id: 'Tenaga Pengajar IT', en: 'IT Instructor' },
    org: 'Cyborg Center',
    short: { id: 'Mengajar Laravel, alat untuk membuat aplikasi web, dari dasar sampai mahir.', en: 'Teaching Laravel, a tool for building web apps, from basics to advanced.' },
    body: {
      id: 'Mengajar Laravel, alat untuk membuat aplikasi web, dari dasar sampai mahir, serta membantu engineer senior membangun fitur dan memperbaiki kesalahan program.',
      en: 'Taught Laravel from fundamentals to advanced topics, and worked with senior engineers on features, debugging and code quality.',
    },
  },
  {
    period: { id: '2022 – 2023', en: '2022 – 2023' },
    role: { id: 'Front-end Developer & UI/UX Designer', en: 'Front-end Developer & UI/UX Designer' },
    org: 'SIT Production',
    short: { id: 'Mendesain dan membangun website untuk proyek klien.', en: 'Designing and building websites for client projects.' },
    body: {
      id: 'Mendesain dan membangun website yang nyaman dibuka di HP maupun laptop untuk proyek klien.',
      en: 'Designed and built responsive websites for client projects.',
    },
  },
];

export const education = {
  degree: { id: 'D4 Manajemen Informatika', en: 'D4 (Bachelor of Applied Science), Informatics Management' } satisfies Localized,
  school: 'Politeknik Negeri Sriwijaya',
  period: '2022 – 2026',
  gpa: { id: 'IPK 3,78 / 4,00', en: 'GPA 3.78 / 4.00' } satisfies Localized,
};

export const recognition: { title: Localized; detail: Localized }[] = [
  {
    title: { id: 'Finalis nasional KMIPN VIII', en: 'National finalist, KMIPN VIII' },
    detail: { id: '2026, bersama ALBATROS', en: '2026, with ALBATROS' },
  },
  {
    title: { id: 'Finalis nasional KMIPN V', en: 'National finalist, KMIPN V' },
    detail: { id: '2023, di semester dua', en: '2023, in my second semester' },
  },
  {
    title: { id: 'Pemateri, Google Developer Groups on Campus', en: 'Speaker, Google Developer Groups on Campus' },
    detail: { id: 'Sesi analisis data, Polsri', en: 'Data analysis session, Polsri' },
  },
];
