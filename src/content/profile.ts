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

export const hero = {
  headline: {
    id: 'Saya mengubah operasional yang berantakan menjadi sistem yang benar-benar dipakai.',
    en: 'I turn messy operations into systems people actually use.',
  } satisfies Localized,
  sub: {
    id: 'Sebelum menulis kode, saya mempelajari cara kerja bisnismu, mulai dari aturannya, pengecualiannya, sampai siapa yang memakainya. Hasilnya sistem yang setiap angkanya bisa ditelusuri dan alurnya masuk akal bagi pemakainya.',
    en: 'Before writing code, I learn how your business actually works, from its rules and exceptions to the people who will use it. The result is a system where every number can be traced and every step makes sense to the people using it.',
  } satisfies Localized,
};

/** How I approach any problem. Each step points at a real decision inside a case study. */
export interface Principle {
  title: Localized;
  body: Localized;
  example: { body: Localized; slug: string; decision: string };
}

export const principles: Principle[] = [
  {
    title: { id: 'Pahami alur yang benar-benar berjalan', en: 'Learn how the work really flows' },
    body: {
      id: 'SOP jarang sama dengan kenyataan. Saya duduk bersama orang yang akan memakai sistemnya, melihat file, chat, dan catatan yang mereka pakai sekarang, lalu memetakan alurnya, termasuk jalan pintas yang tidak pernah tertulis.',
      en: 'Written procedures rarely match reality. I sit with the people who will use the system, look at the files, chats and notes they rely on today, and map the flow, including the shortcuts nobody wrote down.',
    },
    example: {
      body: {
        id: 'Di sistem penggajian, ternyata setiap kontrak klien punya tanggal gajian sendiri. Periode gaji saya buat mengikuti kontraknya, bukan satu tanggal untuk semua.',
        en: 'In a payroll system, it turned out every client contract had its own payday. Pay periods follow each contract instead of one company-wide date.',
      },
      slug: 'sipeg',
      decision: 'pro-rata',
    },
  },
  {
    title: { id: 'Tulis aturannya, termasuk pengecualiannya', en: 'Write the rules down, exceptions included' },
    body: {
      id: 'Sistem yang akurat lahir dari aturan yang jelas. Saya menuliskan setiap aturan bisnis beserta pengecualiannya, dan memastikan kasus-kasus aneh sudah punya jawaban sebelum ada satu baris kode.',
      en: 'Accurate systems come from explicit rules. I write down every business rule with its exceptions and make sure the odd cases have an answer before a line of code exists.',
    },
    example: {
      body: {
        id: 'Di aplikasi beasiswa, data yang belum diisi tidak dihitung sebagai gagal. Syarat itu dikeluarkan dari skor dan ditampilkan sebagai tugas, jadi skor tidak pernah menyesatkan.',
        en: 'In a scholarship app, a missing profile field does not count as a failure. That requirement leaves the score and shows up as a to-do, so the score never misleads.',
      },
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
    example: {
      body: {
        id: 'Pencarian dan AI Coach di aplikasi beasiswa cukup berjalan di satu tempat penyimpanan data, tanpa layanan tambahan yang bisa gagal saat dipakai.',
        en: 'Search and the AI coach in a scholarship app run in a single database, with no extra service that can fail in use.',
      },
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
    example: {
      body: {
        id: 'Setiap baris gaji menampilkan gaji pokok, hari aktif, tarif BPJS, dan potongan kasbonnya. Admin tidak perlu sekadar percaya pada total.',
        en: 'Every pay line shows base pay, active days, the BPJS rate and the cashbon deduction. Admins do not have to take the total on trust.',
      },
      slug: 'sipeg',
      decision: 'traceable',
    },
  },
  {
    title: { id: 'Kunci, uji, lalu serahkan', en: 'Lock it, test it, hand it over' },
    body: {
      id: 'Data yang sudah final tidak boleh berubah diam-diam. Saya mengunci catatan penting, menyediakan alur koreksi yang meninggalkan jejak, menguji aturan bisnisnya, lalu menyerahkan sistem beserta cara merawatnya.',
      en: 'Final data should never change silently. I lock important records, provide a correction flow that leaves a trail, test the business rules, then hand over the system with how to maintain it.',
    },
    example: {
      body: {
        id: 'Di absensi berbasis pengenalan wajah, kehadiran dikunci begitu tercatat. Perubahan harus lewat koreksi yang disetujui admin, jadi riwayatnya selalu bisa diaudit.',
        en: 'In face-recognition attendance, a record is locked once written. Changes go through a correction an admin approves, so the history can always be audited.',
      },
      slug: 'face-recognition-attendance',
      decision: 'locked-records',
    },
  },
];

/** What a client can hire me for, stated as kinds of problems rather than past domains. */
/** Home-page service cards; each links to its page in src/content/services.ts. */
export const services: { key: ServiceKey; title: Localized; body: Localized }[] = [
  {
    key: 'systems',
    title: { id: 'Sistem internal & laporan', en: 'Internal systems & reports' },
    body: {
      id: 'Pencatatan, persetujuan, perhitungan, dan laporan harian yang sekarang masih berjalan di Excel, kertas, atau grup chat.',
      en: 'Daily records, approvals, calculations and reports that still run on spreadsheets, paper or group chats.',
    },
  },
  {
    key: 'apps',
    title: { id: 'Aplikasi web & mobile', en: 'Web & mobile apps' },
    body: {
      id: 'Website untuk pelanggan, aplikasi pemesanan, dan aplikasi HP untuk tim lapangan, tersambung ke data yang sama dengan sistem di kantor.',
      en: 'Customer websites, ordering apps and phone apps for field teams, connected to the same data as the office system.',
    },
  },
  {
    key: 'ai',
    title: { id: 'AI & otomasi yang tepat guna', en: 'AI & automation that earns its place' },
    body: {
      id: 'Pengenalan wajah, pencarian cerdas, dan pekerjaan yang berjalan otomatis. Saya pakai hanya jika memang membantu, dan saya katakan terus terang jika cara biasa sudah cukup.',
      en: 'Face recognition, smart search and work that runs by itself. I use it only when it genuinely helps, and say so plainly when a simpler way is enough.',
    },
  },
  {
    key: 'fix',
    title: { id: 'Merapikan sistem yang sudah ada', en: 'Fixing systems you already have' },
    body: {
      id: 'Memperbaiki perhitungan yang sering salah, merapikan tampilan yang membingungkan, dan menambal data yang bolong tanpa menghentikan pekerjaan sehari-hari.',
      en: 'Fixing calculations that keep going wrong, tidying confusing screens and filling data gaps without stopping daily work.',
    },
  },
];

export const experience: { period: Localized; role: Localized; org: string; body: Localized }[] = [
  {
    period: { id: 'Jun 2026 – sekarang', en: 'Jun 2026 – present' },
    role: { id: 'Software Developer', en: 'Software Developer' },
    org: 'Loranet Technologies PLT',
    body: {
      id: 'Pengembang aplikasi di perusahaan teknologi asal Malaysia. Saya mempelajari cara kerja sistem yang sudah berjalan, lalu menambahkan fitur baru untuk aplikasi web dan HP milik klien perusahaan.',
      en: 'Software developer at a Malaysian technology company. I study how existing systems flow, then build new features for web and mobile applications on the company’s client projects.',
    },
  },
  {
    period: { id: 'Okt 2025 – sekarang', en: 'Oct 2025 – present' },
    role: { id: 'Founder & CEO', en: 'Founder & CEO' },
    org: 'Berkala Digital',
    body: {
      id: 'Agensi digital kreatif di Palembang yang tetap saya jalankan paralel dengan pekerjaan saya. Saya menentukan arah, menjalankan proyek dan penjualan, serta mengoordinasikan tim kreatif dan tim IT. Tiga klien bisnis di tiga bulan pertama.',
      en: 'Creative digital agency in Palembang that I keep running alongside my job. I set direction, run projects and sales, and coordinate a creative team and an IT team. Three business clients in the first three months.',
    },
  },
  {
    period: { id: '2024 – 2026', en: '2024 – 2026' },
    role: { id: 'Mentor IT & Akademik', en: 'IT & Academic Mentor' },
    org: 'SINTAK, Politeknik Negeri Sriwijaya',
    body: {
      id: 'Dipercaya tiga tahun berturut-turut membimbing mahasiswa junior dalam keahlian teknis dan adaptasi akademik.',
      en: 'Chosen three years in a row to mentor junior students on technical skills and campus life.',
    },
  },
  {
    period: { id: '2023 – 2024', en: '2023 – 2024' },
    role: { id: 'Tenaga Pengajar IT', en: 'IT Instructor' },
    org: 'Cyborg Center',
    body: {
      id: 'Mengajar Laravel, alat untuk membuat aplikasi web, dari dasar sampai mahir, serta membantu engineer senior membangun fitur dan memperbaiki kesalahan program.',
      en: 'Taught Laravel from fundamentals to advanced topics, and worked with senior engineers on features, debugging and code quality.',
    },
  },
  {
    period: { id: '2022 – 2023', en: '2022 – 2023' },
    role: { id: 'Front-end Developer & UI/UX Designer', en: 'Front-end Developer & UI/UX Designer' },
    org: 'SIT Production',
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
