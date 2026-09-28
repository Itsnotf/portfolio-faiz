import { services as cards, type Localized } from './profile';

export type ServiceKey = 'systems' | 'apps' | 'ai' | 'fix';

/**
 * A question and answer. `confirmed: false` answers describe how Faiz works with clients and are drafts until he
 * confirms them. They are left out of the pages and the structured data until then.
 */
export interface Faq {
  q: Localized;
  a: Localized;
  confirmed: boolean;
}

export interface Service {
  key: ServiceKey;
  slug: Localized;
  /** Search result title, keyword first. The site name is appended by the layout. */
  metaTitle: Localized;
  metaDescription: Localized;
  /** Short name used in cards and navigation. */
  name: Localized;
  h1: Localized;
  /** First paragraph: a direct answer to "what is this and who is it for". */
  lead: Localized;
  problems: Localized[];
  /** Project slugs from src/content/work.ts that prove the service. */
  proof: string[];
  costFactors: Localized[];
  faq: Faq[];
  updated: string;
}

export const services: Service[] = [
  {
    key: 'systems',
    slug: { id: 'sistem-informasi-custom', en: 'custom-business-systems' },
    metaTitle: { id: 'Jasa Pembuatan Sistem Informasi Custom', en: 'Custom Business System Development' },
    metaDescription: {
      id: 'Jasa pembuatan sistem informasi dan dashboard custom untuk pencatatan, persetujuan, perhitungan, dan laporan yang setiap angkanya bisa ditelusuri.',
      en: 'Custom business systems and dashboards for records, approvals, calculations and reports, built so every number can be traced back to its source.',
    },
    name: { id: 'Sistem informasi & dashboard', en: 'Business systems & dashboards' },
    h1: { id: 'Jasa pembuatan sistem informasi dan dashboard custom', en: 'Custom business systems and dashboards' },
    lead: {
      id: 'Saya membangun sistem informasi custom untuk pekerjaan harian yang sekarang masih berjalan di Excel, kertas, atau grup chat, seperti penggajian, pengadaan barang, persetujuan berjenjang, dan laporan. Sistemnya mengikuti aturan bisnismu, setiap angka bisa ditelusuri ke asalnya, dan orang yang memakainya benar-benar terbantu.',
      en: 'I build custom business systems for daily work that still runs on spreadsheets, paper or group chats, such as payroll, procurement, tiered approvals and reporting. The system follows your business rules, every number can be traced to its source, and the people using it actually find it helpful.',
    },
    problems: [
      { id: 'Rekap bulanan memakan waktu berhari-hari dan angkanya sering berbeda antar file.', en: 'Monthly reports take days and the numbers differ between files.' },
      { id: 'Tidak jelas siapa yang harus menyetujui, dan dokumen tertahan tanpa ada yang tahu.', en: 'Nobody is sure who has to approve what, and documents get stuck without anyone noticing.' },
      { id: 'Aturan perhitungan hanya dipahami satu orang, sehingga sulit diperiksa ulang.', en: 'Only one person understands how the numbers are calculated, so nobody else can check them.' },
      { id: 'Pimpinan butuh angka terkini tanpa menunggu laporan manual.', en: 'Managers need current figures without waiting for a manual report.' },
    ],
    proof: ['sipeg', 'procurement', 'shareholder-directives', 'task-handover'],
    costFactors: [
      { id: 'Jumlah alur kerja dan jenis dokumen yang perlu diatur.', en: 'How many workflows and document types need to be handled.' },
      { id: 'Jumlah peran pengguna dan tingkat persetujuannya.', en: 'How many user roles and approval levels there are.' },
      { id: 'Kerumitan aturan perhitungan dan pengecualiannya.', en: 'How complex the calculation rules and their exceptions are.' },
      { id: 'Data lama yang perlu dipindahkan dan dirapikan.', en: 'Existing data that needs to be moved over and cleaned up.' },
      { id: 'Laporan, dashboard, dan dokumen cetak yang dibutuhkan.', en: 'The reports, dashboards and printed documents you need.' },
    ],
    faq: [
      {
        q: { id: 'Apa bedanya sistem custom dengan aplikasi siap pakai?', en: 'How is a custom system different from off-the-shelf software?' },
        a: {
          id: 'Aplikasi siap pakai membuat bisnis mengikuti cara kerja aplikasinya. Sistem custom dibangun dari alur kerja dan aturanmu sendiri, termasuk pengecualiannya, jadi tim tidak perlu mencari jalan pintas di luar sistem.',
          en: 'Off-the-shelf software makes the business follow the software. A custom system is built from your own workflow and rules, exceptions included, so the team does not need workarounds outside the system.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Apakah data di Excel yang sudah ada bisa dipindahkan?', en: 'Can the data we already have in spreadsheets be moved over?' },
        a: {
          id: 'Bisa. Data lama dipelajari dulu, dirapikan, lalu dipindahkan dengan pemeriksaan supaya angka di sistem baru sama dengan catatan lama.',
          en: 'Yes. The existing data is studied first, cleaned up, then moved with checks so the numbers in the new system match the old records.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Bisakah sistemnya dipakai lewat HP?', en: 'Can the system be used on a phone?' },
        a: {
          id: 'Bisa. Tampilannya menyesuaikan layar HP, dan kalau tim lapangan membutuhkannya, sistem bisa dilengkapi aplikasi mobile yang memakai data yang sama.',
          en: 'Yes. The screens adapt to phones, and if field teams need it, the system can get a mobile app that uses the same data.',
        },
        confirmed: true,
      },
    ],
    updated: '2026-09-28',
  },
  {
    key: 'apps',
    slug: { id: 'aplikasi-web-mobile', en: 'web-and-mobile-apps' },
    metaTitle: { id: 'Jasa Pembuatan Aplikasi Web dan Mobile', en: 'Web and Mobile App Development' },
    metaDescription: {
      id: 'Jasa pembuatan aplikasi web dan mobile untuk pelanggan dan tim lapangan, terhubung ke data yang sama dengan sistem internal, dari rancangan sampai rilis.',
      en: 'Web and mobile apps for customers and field teams, connected to the same data as your internal systems, from the first screen design to release.',
    },
    name: { id: 'Aplikasi web & mobile', en: 'Web & mobile apps' },
    h1: { id: 'Jasa pembuatan aplikasi web dan mobile', en: 'Web and mobile app development' },
    lead: {
      id: 'Saya membangun aplikasi web dan mobile untuk pelanggan maupun tim lapangan, misalnya aplikasi pemesanan, peminjaman barang, pendaftaran, dan portal pelanggan. Aplikasinya terhubung ke data yang sama dengan sistem internal, jadi tidak ada data yang perlu diketik dua kali.',
      en: 'I build web and mobile apps for customers and field teams, such as ordering, equipment loans, registrations and customer portals. The app shares its data with your internal system, so nothing has to be typed twice.',
    },
    problems: [
      { id: 'Pelanggan harus menghubungi admin untuk hal yang bisa mereka lakukan sendiri.', en: 'Customers have to contact an admin for things they could do themselves.' },
      { id: 'Tim lapangan mencatat di kertas lalu menyalinnya lagi di kantor.', en: 'Field teams write things on paper and type them in again at the office.' },
      { id: 'Aplikasi yang ada terasa lambat dan membingungkan sehingga jarang dipakai.', en: 'The current app feels slow and confusing, so people rarely use it.' },
      { id: 'Data dari aplikasi pelanggan tidak nyambung dengan sistem di kantor.', en: 'Data from the customer app does not connect to the office system.' },
    ],
    proof: ['albatros', 'equipment-loans', 'mood-orders', 'fitverse'],
    costFactors: [
      { id: 'Web saja, mobile saja, atau keduanya.', en: 'Web only, mobile only, or both.' },
      { id: 'Jumlah halaman dan alur yang dilalui pengguna.', en: 'How many screens and user journeys there are.' },
      { id: 'Pembayaran, notifikasi, peta, atau layanan pihak ketiga yang perlu disambungkan.', en: 'Payments, notifications, maps or other third-party services to connect.' },
      { id: 'Desain tampilan dari nol atau mengikuti identitas merek yang sudah ada.', en: 'Designing the screens from scratch or following an existing brand.' },
      { id: 'Rilis ke Play Store dan App Store.', en: 'Publishing to the Play Store and App Store.' },
    ],
    faq: [
      {
        q: { id: 'Aplikasinya untuk Android atau iOS?', en: 'Is the app for Android or iOS?' },
        a: {
          id: 'Keduanya. Aplikasi mobile saya bangun dengan React Native (Expo), jadi satu kode bisa dipakai untuk Android dan iOS.',
          en: 'Both. I build mobile apps with React Native (Expo), so one codebase runs on Android and iOS.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Apakah aplikasinya bisa terhubung ke sistem yang sudah ada?', en: 'Can the app connect to a system we already use?' },
        a: {
          id: 'Bisa, selama data dari sistem lama bisa diakses. Sambungannya dirancang supaya kedua sisi selalu menampilkan data yang sama.',
          en: 'Yes, as long as the existing system’s data can be reached. The connection is designed so both sides always show the same data.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Siapa yang membuat desain tampilannya?', en: 'Who designs the screens?' },
        a: {
          id: 'Saya sendiri. Saya memulai karier dari desain UI dan front-end, jadi tampilan dan logikanya dikerjakan oleh orang yang sama.',
          en: 'I do. I started my career in UI design and front-end work, so the screens and the logic are built by the same person.',
        },
        confirmed: true,
      },
    ],
    updated: '2026-09-28',
  },
  {
    key: 'ai',
    slug: { id: 'aplikasi-ai-otomasi', en: 'ai-and-automation' },
    metaTitle: { id: 'Jasa Pembuatan Aplikasi AI dan Otomasi', en: 'AI and Automation for Business Apps' },
    metaDescription: {
      id: 'Jasa pembuatan aplikasi AI dan otomasi, seperti absensi pengenalan wajah, penilaian otomatis, dan rekomendasi, dipakai hanya jika masalahnya memang butuh AI.',
      en: 'AI and automation for business apps, such as face-recognition attendance, automated scoring and recommendations, used only where the problem calls for it.',
    },
    name: { id: 'AI & otomasi', en: 'AI & automation' },
    h1: { id: 'Jasa pembuatan aplikasi AI dan otomasi', en: 'AI and automation for business apps' },
    lead: {
      id: 'Saya menambahkan AI ke aplikasi ketika masalahnya memang membutuhkannya, misalnya mengenali wajah untuk absensi, menilai esai, mendeteksi emosi dari suara, atau memberi rekomendasi. Bagian yang cukup diselesaikan dengan aturan biasa tetap memakai aturan biasa, dan diberi label jujur.',
      en: 'I add AI to an app when the problem really calls for it, for example recognising faces for attendance, scoring essays, detecting emotion in a voice, or making recommendations. Parts that plain rules can handle keep using plain rules, and are labelled honestly.',
    },
    problems: [
      { id: 'Absensi masih bisa dititipkan atau direkap manual.', en: 'Attendance can still be faked or has to be compiled by hand.' },
      { id: 'Tim menghabiskan waktu untuk pekerjaan berulang yang polanya jelas.', en: 'The team spends time on repetitive work with a clear pattern.' },
      { id: 'Pengguna butuh rekomendasi yang sesuai kondisi mereka, bukan daftar yang sama untuk semua.', en: 'Users need recommendations that fit their situation, not the same list for everyone.' },
      { id: 'Ada ide memakai AI, tapi belum jelas bagian mana yang benar-benar terbantu.', en: 'There is an idea to use AI, but it is unclear which part it would actually help.' },
    ],
    proof: ['face-recognition-attendance', 'albatros', 'mood-orders', 'study-methods'],
    costFactors: [
      { id: 'Memakai model yang sudah ada atau perlu dilatih dengan data sendiri.', en: 'Using an existing model or training one on your own data.' },
      { id: 'Ketersediaan dan kualitas data contoh.', en: 'How much sample data exists and how good it is.' },
      { id: 'Kebutuhan kecepatan, misalnya harus langsung dari kamera.', en: 'Speed requirements, for example working straight from a camera.' },
      { id: 'Biaya layanan AI pihak ketiga per pemakaian.', en: 'Per-use fees of third-party AI services.' },
      { id: 'Cara hasil AI diperiksa sebelum dipakai untuk keputusan.', en: 'How AI results are checked before they drive a decision.' },
    ],
    faq: [
      {
        q: { id: 'Apakah semua fitur harus memakai AI?', en: 'Does every feature need AI?' },
        a: {
          id: 'Tidak. AI hanya dipakai ketika aturan biasa tidak cukup. Hasilnya lebih murah dirawat dan lebih mudah dipercaya.',
          en: 'No. AI is used only where plain rules are not enough. The result is cheaper to maintain and easier to trust.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Seberapa akurat hasil AI-nya?', en: 'How accurate are the AI results?' },
        a: {
          id: 'Tergantung datanya, jadi ketepatannya selalu diukur dan batasnya ditentukan bersama. Di sistem absensi pengenalan wajah, misalnya, kehadiran baru dicatat jika sistem minimal 65% yakin.',
          en: 'It depends on the data, so accuracy is always measured and the limits are agreed together. In the face-recognition attendance system, for example, attendance is recorded only when the system is at least 65% sure.',
        },
        confirmed: true,
      },
    ],
    updated: '2026-09-28',
  },
  {
    key: 'fix',
    slug: { id: 'perbaikan-pengembangan-aplikasi', en: 'fixing-existing-systems' },
    metaTitle: { id: 'Jasa Perbaikan dan Pengembangan Aplikasi', en: 'Fixing and Improving Existing Systems' },
    metaDescription: {
      id: 'Perbaikan dan pengembangan aplikasi yang sudah berjalan, dari logika yang sering salah sampai data yang berantakan, tanpa menghentikan operasional.',
      en: 'Fixing and extending apps that are already running, from logic that keeps getting things wrong to messy data, without stopping daily operations.',
    },
    name: { id: 'Merapikan sistem yang sudah ada', en: 'Fixing existing systems' },
    h1: { id: 'Jasa perbaikan dan pengembangan aplikasi yang sudah ada', en: 'Fixing and improving systems you already have' },
    lead: {
      id: 'Tidak semua masalah perlu sistem baru. Saya mempelajari alur sistem yang sudah berjalan, menemukan logika yang sering salah atau tampilan yang membingungkan, lalu memperbaikinya dan menambah fitur tanpa menghentikan pekerjaan sehari-hari.',
      en: 'Not every problem needs a new system. I study how the existing system flows, find the logic that keeps going wrong or the screens that confuse people, then fix them and add features without stopping daily work.',
    },
    problems: [
      { id: 'Hasil hitungan kadang salah dan tidak ada yang tahu sebabnya.', en: 'Calculations are sometimes wrong and nobody knows why.' },
      { id: 'Tampilan membingungkan sehingga tim kembali ke Excel.', en: 'The screens are confusing, so the team goes back to spreadsheets.' },
      { id: 'Developer lama sudah tidak ada dan tidak ada dokumentasi.', en: 'The original developer is gone and nothing is documented.' },
      { id: 'Butuh fitur baru, tapi takut merusak yang sudah berjalan.', en: 'You need new features but worry about breaking what already works.' },
    ],
    proof: ['sipeg', 'procurement'],
    costFactors: [
      { id: 'Kondisi kode dan ada tidaknya dokumentasi.', en: 'The state of the code and whether it is documented.' },
      { id: 'Seberapa dalam masalah logikanya.', en: 'How deep the logic problems go.' },
      { id: 'Apakah data yang sudah salah perlu dikoreksi.', en: 'Whether data that is already wrong needs correcting.' },
      { id: 'Jumlah fitur baru yang ditambahkan.', en: 'How many new features are added.' },
      { id: 'Kebutuhan pengujian sebelum perubahan dipakai.', en: 'How much testing is needed before changes go live.' },
    ],
    faq: [
      {
        q: { id: 'Bisakah memperbaiki aplikasi yang dibuat developer lain?', en: 'Can you fix an app another developer built?' },
        a: {
          id: 'Bisa. Pekerjaan saya sehari-hari termasuk membaca alur sistem yang sudah berjalan lalu mengembangkan fitur di atasnya. Langkah pertama selalu memahami kode dan datanya sebelum mengubah apa pun.',
          en: 'Yes. My daily work includes reading how existing systems flow and building features on top of them. The first step is always understanding the code and the data before changing anything.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Teknologi apa yang bisa ditangani?', en: 'Which technologies can you work with?' },
        a: {
          id: 'Terutama aplikasi web berbasis Laravel, React, dan Next.js, serta aplikasi mobile React Native. Untuk teknologi lain, saya sampaikan dulu apakah saya orang yang tepat.',
          en: 'Mainly web apps built with Laravel, React and Next.js, and mobile apps built with React Native. For anything else, I will tell you first whether I am the right person.',
        },
        confirmed: true,
      },
      {
        q: { id: 'Apakah operasional harus berhenti selama perbaikan?', en: 'Does daily work have to stop during the fix?' },
        a: {
          id: 'Tidak. Perubahan disiapkan dan diuji terpisah, lalu dipasang bertahap supaya pekerjaan sehari-hari tetap berjalan.',
          en: 'No. Changes are prepared and tested separately, then rolled out step by step so daily work keeps running.',
        },
        confirmed: true,
      },
    ],
    updated: '2026-09-28',
  },
];

export const serviceBySlug = (locale: 'id' | 'en', slug: string) => services.find((s) => s.slug[locale] === slug);
export const serviceByKey = (key: ServiceKey) => services.find((s) => s.key === key)!;
/** The plain one-line summary shown on the home-page card, reused wherever a service is listed. */
export const summary = (key: ServiceKey, locale: 'id' | 'en') => cards.find((c) => c.key === key)?.body[locale] ?? '';

/** The local landing page for Palembang and South Sumatra. */
export const local = {
  metaTitle: { id: 'Jasa Pembuatan Aplikasi Palembang', en: 'Software Developer in Palembang, Indonesia' } satisfies Localized,
  metaDescription: {
    id: 'Jasa pembuatan aplikasi, sistem informasi, dan aplikasi mobile di Palembang dan Sumatera Selatan oleh software engineer yang berbasis di Palembang.',
    en: 'Custom business systems, web and mobile apps for companies in Palembang and South Sumatra, by a software engineer based in Palembang, Indonesia.',
  } satisfies Localized,
  h1: { id: 'Jasa pembuatan aplikasi dan sistem informasi di Palembang', en: 'Software developer based in Palembang, Indonesia' } satisfies Localized,
  lead: {
    id: 'Saya software engineer yang berbasis di Palembang. Saya membangun sistem informasi, aplikasi web, dan aplikasi mobile untuk usaha dan instansi di Palembang dan Sumatera Selatan, dan juga menerima proyek dari kota lain maupun luar negeri secara jarak jauh.',
    en: 'I am a software engineer based in Palembang. I build business systems, web apps and mobile apps for companies and institutions in Palembang and South Sumatra, and I also take on projects from other cities and abroad, working remotely.',
  } satisfies Localized,
  proof: ['budaya-sumsel', 'face-recognition-attendance'],
  faq: [
    {
      q: { id: 'Apakah juga melayani klien di luar Palembang?', en: 'Do you work with clients outside Palembang?' },
      a: {
        id: 'Ya. Diskusi, pengembangan, dan serah terima bisa dilakukan jarak jauh, jadi klien di kota lain maupun luar negeri tetap bisa bekerja sama.',
        en: 'Yes. Discussions, development and handover can all happen remotely, so clients in other cities or abroad can work with me too.',
      },
      confirmed: true,
    },
    {
      q: { id: 'Apakah bisa bertemu langsung di Palembang?', en: 'Can we meet in person in Palembang?' },
      a: {
        id: 'Bisa. Untuk klien di Palembang, pertemuan pertama untuk memetakan alur kerja bisa dilakukan langsung di tempat.',
        en: 'Yes. For clients in Palembang, the first meeting to map the workflow can happen on site.',
      },
      confirmed: true,
    },
  ] satisfies Faq[],
  updated: '2026-09-28',
};

/** Questions clients ask before starting. Drafts about working terms stay hidden until confirmed. */
export const generalFaq: Faq[] = [
  {
    q: { id: 'Aplikasi apa saja yang bisa dibuatkan?', en: 'What kinds of software can you build?' },
    a: {
      id: 'Sistem informasi dan dashboard untuk operasional, aplikasi web dan mobile untuk pelanggan atau tim lapangan, fitur AI dan otomasi, serta perbaikan dan pengembangan aplikasi yang sudah ada.',
      en: 'Business systems and dashboards for daily operations, web and mobile apps for customers or field teams, AI and automation features, and fixes and improvements to apps you already have.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Bagaimana proses pembuatannya?', en: 'How does a project work?' },
    a: {
      id: 'Dimulai dari memahami cara kerja yang berjalan sekarang, termasuk jalan pintas yang tidak tertulis. Setelah aturan dan pengecualiannya jelas, sistem dibangun bertahap, diuji bersama orang yang akan memakainya, lalu diserahkan beserta cara merawatnya.',
      en: 'It starts with understanding how the work runs today, including the unwritten shortcuts. Once the rules and exceptions are clear, the system is built in stages, tested with the people who will use it, then handed over with how to maintain it.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Berapa biaya pembuatan aplikasi?', en: 'How much does a custom app cost?' },
    a: {
      id: 'Biaya tergantung jumlah alur kerja, peran pengguna, kerumitan aturan, data lama yang perlu dipindahkan, dan apakah butuh aplikasi mobile atau sambungan ke sistem lain. Ceritakan kebutuhannya lewat email atau WhatsApp untuk mendapat perkiraan.',
      en: 'It depends on the number of workflows, user roles, how complex the rules are, existing data to move over, and whether you need a mobile app or connections to other systems. Describe what you need by email or WhatsApp to get an estimate.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Berapa lama pembuatannya?', en: 'How long does it take?' },
    a: {
      id: 'Tergantung cakupannya. Setelah alur kerjanya dipahami, saya memberi perkiraan waktu per tahap supaya kemajuannya bisa dipantau.',
      en: 'It depends on the scope. Once the workflow is understood, I give a time estimate per stage so progress can be followed.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Apa yang perlu disiapkan sebelum menghubungi?', en: 'What should I prepare before getting in touch?' },
    a: {
      id: 'Cukup ceritakan apa yang berjalan sekarang, siapa saja yang akan memakai sistemnya, dan bagian mana yang paling sering salah atau paling lambat. Contoh file atau formulir yang dipakai sekarang juga sangat membantu.',
      en: 'Just describe what runs today, who will use the system, and which part goes wrong most often or is slowest. Sample files or forms you use now help a lot too.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Apakah bisa bekerja jarak jauh?', en: 'Can you work remotely?' },
    a: {
      id: 'Bisa. Saya berbasis di Palembang dan terbiasa bekerja jarak jauh, termasuk dengan tim di luar negeri.',
      en: 'Yes. I am based in Palembang and used to working remotely, including with teams abroad.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Bahasa apa yang dipakai?', en: 'Which languages do you work in?' },
    a: {
      id: 'Bahasa Indonesia dan Bahasa Inggris, baik untuk diskusi maupun untuk tampilan aplikasinya.',
      en: 'Indonesian and English, both for discussions and for the app’s screens.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Apakah kode sumbernya diserahkan?', en: 'Do I get the source code?' },
    a: {
      id: 'Ya. Kode sumber dan akses ke server diserahkan saat proyek selesai, jadi sistemnya sepenuhnya milikmu.',
      en: 'Yes. The source code and server access are handed over when the project is finished, so the system is fully yours.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Apakah ada perawatan setelah sistem selesai?', en: 'Is there support after the system is finished?' },
    a: {
      id: 'Ada. Setelah serah terima, perbaikan dan penyesuaian kecil bisa dilanjutkan dengan kesepakatan perawatan.',
      en: 'Yes. After handover, fixes and small adjustments can continue under a maintenance agreement.',
    },
    confirmed: true,
  },
  {
    q: { id: 'Bagaimana cara pembayarannya?', en: 'How does payment work?' },
    a: {
      id: 'Pembayaran dibagi per tahap pengerjaan, sehingga setiap pembayaran sesuai dengan hasil yang sudah bisa dilihat.',
      en: 'Payment is split by project stage, so each payment matches work you can already see.',
    },
    confirmed: true,
  },
];

/** Only answers Faiz has confirmed are shown and put in structured data. */
export const published = (items: Faq[]) => items.filter((f) => f.confirmed);
