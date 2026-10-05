import type { Localized } from './profile';

/** The kind of problem a project solves, in the words a client would use. */
export type Problem = 'rules' | 'workflow' | 'records' | 'ai' | 'public';
export const PROBLEMS: Problem[] = ['rules', 'workflow', 'records', 'ai', 'public'];

export interface Shot {
  src: string;
  width: number;
  height: number;
  kind: 'desktop' | 'mobile';
  alt: Localized;
}

export interface Decision {
  /** Anchor on the case-study page, linked from the "How I think" section. */
  id: string;
  title: Localized;
  body: Localized;
}

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: Localized;
}

/** A case study in four plain lines for the home page and the top of the case page. Facts only, no claims beyond the case. */
export interface Brief {
  audience: Localized;
  problem: Localized;
  built: Localized;
  result: Localized;
}

export interface CaseStudy {
  brief: Brief;
  context: Localized[];
  decisions: Decision[];
  stats?: Stat[];
  status: Localized;
  reflection?: Localized;
}

/** A small entity-relationship sketch for projects without screenshots. Positions are grid cells. */
export interface Diagram {
  nodes: { id: string; label: Localized; col: number; row: number }[];
  /** 'flow' is a pipeline step (data moving to the next stage) rather than a relation. */
  edges: [from: string, to: string, kind: '1-1' | '1-n' | 'n-n' | 'flow'][];
}

export interface Project {
  slug: string;
  title: Localized;
  /** Case studies: search-result title with the keyword a client would type. */
  seoTitle?: Localized;
  /** Case studies: last content update (ISO date), shown on the page and in structured data. */
  updated?: string;
  /** Case studies: search-result description (≤160 characters). */
  seoDescription?: Localized;
  /** The client's problem in one sentence. */
  problem: Localized;
  summary: Localized;
  problems: Problem[];
  year: string;
  role: Localized;
  status: Localized;
  stack: string[];
  shots: Shot[];
  /** Archive cards: the one decision worth knowing about. */
  keyDecision?: Localized;
  diagram?: Diagram;
  caseStudy?: CaseStudy;
}

const same = (s: string): Localized => ({ id: s, en: s });

export const projects: Project[] = [
  {
    slug: 'albatros',
    seoDescription: {
      id: 'Studi kasus aplikasi pencocokan beasiswa ALBATROS, finalis nasional KMIPN VIII, yang memberi skor kelayakan dengan jujur dan AI Coach yang menyebut sumbernya.',
      en: 'Case study of ALBATROS, a scholarship matching app and national finalist that scores eligibility honestly and has an AI coach that names its sources.',
    },
    seoTitle: { id: 'Aplikasi Pencocokan Beasiswa ALBATROS', en: 'ALBATROS Scholarship Matching App' },
    updated: '2026-09-28',
    title: same('ALBATROS'),
    problem: {
      id: 'Informasi beasiswa tersebar di banyak tempat, dan pelajar tidak tahu beasiswa mana yang benar-benar cocok untuk mereka.',
      en: 'Scholarship information was scattered everywhere, and students could not tell which scholarships actually fit them.',
    },
    summary: {
      en: 'A scholarship companion app that shows students which scholarships fit them, exactly which requirements they still miss, and coaches their essays and interviews.',
      id: 'Aplikasi pendamping beasiswa yang menunjukkan beasiswa mana yang cocok, syarat mana yang belum terpenuhi, dan melatih esai serta wawancara.',
    },
    problems: ['rules', 'ai'],
    year: '2026',
    role: { en: 'Team lead and sole developer', id: 'Ketua tim dan satu-satunya pengembang aplikasi' },
    status: { en: 'In development, national finalist', id: 'Dalam pengembangan, finalis nasional' },
    stack: ['Expo (React Native)', 'NestJS', 'Next.js', 'PostgreSQL + pgvector', 'Prisma', 'Turborepo'],
    shots: [
      { src: '/work/alb-home.png', width: 1170, height: 2532, kind: 'mobile', alt: { en: 'ALBATROS home screen with scholarship recommendations and profile completeness', id: 'Beranda ALBATROS dengan rekomendasi beasiswa dan kelengkapan profil' } },
      { src: '/work/alb-kelayakan.png', width: 1170, height: 3690, kind: 'mobile', alt: { en: 'Eligibility check listing each requirement with its reason', id: 'Cek kelayakan yang menampilkan setiap syarat beserta alasannya' } },
      { src: '/work/alb-coach.png', width: 1170, height: 3900, kind: 'mobile', alt: { en: 'AI Coach essay feedback scored on five criteria', id: 'Umpan balik esai AI Coach dengan penilaian lima kriteria' } },
    ],
    caseStudy: {
      brief: {
        audience: { id: 'Pelajar yang sedang mencari beasiswa.', en: 'Students looking for scholarships.' },
        problem: {
          id: 'Info beasiswa tersebar di mana-mana. Dari 80 pelajar yang disurvei, 76,3% ingin semuanya ada di satu tempat.',
          en: 'Scholarship information is scattered everywhere. Of 80 students surveyed, 76.3% wanted it all in one place.',
        },
        built: {
          id: 'Aplikasi HP yang menunjukkan beasiswa yang cocok, syarat yang masih kurang, dan melatih esai serta wawancara. Saya memimpin tim tiga orang dan menulis seluruh kodenya.',
          en: 'A phone app that shows which scholarships fit, which requirements are still missing, and coaches essays and interviews. I led a team of three and wrote all the code.',
        },
        result: { id: 'Finalis nasional KMIPN VIII 2026. Masih dalam pengembangan.', en: 'National finalist at KMIPN VIII, 2026. Still in development.' },
      },
      context: [
        {
          en: 'A survey of 80 students made the problem clear, with 60.5% finding scholarship information scattered and 76.3% wanting a single platform. ALBATROS was built for KMIPN VIII and reached the national final. I led a team of three and wrote all of the code myself.',
          id: 'Survei terhadap 80 pelajar menunjukkan masalahnya dengan jelas. Sebanyak 60,5% merasa informasi beasiswa tersebar, dan 76,3% menginginkan satu platform. ALBATROS dibangun untuk KMIPN VIII dan lolos ke final nasional. Saya memimpin tim tiga orang dan menulis seluruh kodenya sendiri.',
        },
        {
          en: 'The constraints were one developer, a competition deadline, and personal data regulated by Indonesia’s data protection law, including minors and family income. Every technical decision is written down with its reasoning, in a decision log that now holds 84 decisions.',
          id: 'Batasannya adalah satu orang pengembang, tenggat lomba, dan data pribadi yang diatur UU PDP, termasuk data anak di bawah umur dan penghasilan keluarga. Setiap keputusan teknis dicatat beserta alasannya, dalam catatan keputusan yang kini berisi 84 keputusan.',
        },
      ],
      stats: [
        { value: 80, label: { id: 'pelajar disurvei', en: 'students surveyed' } },
        { value: 60.5, decimals: 1, suffix: '%', label: { id: 'merasa informasinya tersebar', en: 'found the information scattered' } },
        { value: 76.3, decimals: 1, suffix: '%', label: { id: 'ingin satu platform', en: 'wanted a single platform' } },
        { value: 84, label: { id: 'keputusan teknis tercatat', en: 'technical decisions logged' } },
      ],
      decisions: [
        {
          id: 'monorepo',
          title: { en: 'One source of data for the student app and the admin', id: 'Satu sumber data untuk aplikasi siswa dan admin' },
          body: {
            en: 'The student mobile app and the admin dashboard get their data from the same server and check it with the same rules, so the two can never show different versions of the data.',
            id: 'Aplikasi mobile untuk siswa dan halaman admin mengambil data dari sumber yang sama dan memeriksanya dengan aturan yang sama, jadi keduanya tidak mungkin menampilkan versi data yang berbeda.',
          },
        },
        {
          id: 'one-database',
          title: { en: 'One database for everything', id: 'Satu tempat data untuk semuanya' },
          body: {
            en: 'Ordinary search and the meaning-based search behind the AI Coach both run in one database, with no extra service. For a one-developer team, every extra system is one more thing that can break during a live demo.',
            id: 'Pencarian biasa dan pencarian berdasarkan makna untuk AI Coach sama-sama berjalan di satu tempat penyimpanan data, tanpa layanan tambahan. Untuk tim dengan satu pengembang, setiap sistem tambahan adalah satu hal lagi yang bisa rusak saat demo.',
          },
        },
        {
          id: 'unknown-not-failed',
          title: { en: '“Unknown” is not “failed”', id: '“Belum diketahui” bukan “tidak lolos”' },
          body: {
            en: 'When a profile field is empty, that requirement is left out of the score and shown as a to-do instead of a failure. A score of 100 based on one requirement would be misleading, so the score always appears with its coverage (“checked 4 of 6 requirements”) and the verdict comes before the number.',
            id: 'Kalau data profil belum diisi, syarat itu dikeluarkan dari skor dan ditampilkan sebagai tugas, bukan kegagalan. Skor 100 dari satu syarat akan menyesatkan, jadi skor selalu tampil bersama cakupannya (“dinilai dari 4 dari 6 kriteria”) dan status kelayakan tampil sebelum angka.',
          },
        },
        {
          id: 'honest-ai',
          title: { en: 'Honest about what is AI and what is not', id: 'Jujur soal mana yang AI dan mana yang bukan' },
          body: {
            en: 'The “next step” tip comes from plain rules, so it carries no AI label. The AI Coach scores essays on five criteria and has to name the sources it used.',
            id: 'Saran langkah berikutnya dihasilkan oleh aturan biasa, jadi tidak diberi label AI. AI Coach menilai esai dengan lima kriteria dan wajib menyebutkan sumber yang dipakainya.',
          },
        },
        {
          id: 'documents',
          title: { en: 'Personal documents never pass through the server', id: 'Dokumen pribadi tidak pernah melewati server' },
          body: {
            en: 'ID cards and family records upload straight to locked private storage, and the server only grants permission to upload. A file the server never holds is a file the server cannot leak.',
            id: 'KTP dan KK diunggah langsung ke penyimpanan pribadi yang terkunci, dan server hanya memberi izin unggah. Berkas yang tidak pernah dipegang server tidak mungkin bocor dari server.',
          },
        },
      ],
      status: {
        en: 'In development, with eight foundation stages complete, covering login, consent to data use, search, scholarship matching, the AI Coach, document storage, preparation tracking with reminders, and an admin review of incoming scholarship data. It is designed so a student knows where they stand on a scholarship without reading its guidelines line by line.',
        id: 'Dalam pengembangan, dengan delapan tahap dasar yang sudah selesai, yaitu login, persetujuan penggunaan data, pencarian, pencocokan beasiswa, AI Coach, penyimpanan dokumen, pelacakan persiapan dengan pengingat, serta pemeriksaan data beasiswa oleh admin. Sistem ini dirancang agar pelajar tahu posisinya terhadap sebuah beasiswa tanpa membaca pedomannya satu per satu.',
      },
      reflection: {
        en: 'The rule “a score always travels with its coverage” is applied on the eligibility screen, but the home screen cards still show “100% match” on their own. If I did it again, I would build one score element that simply cannot appear without its coverage.',
        id: 'Aturan “skor selalu bersama cakupannya” sudah berlaku di layar Cek Kelayakan, tapi kartu beranda masih menampilkan “100% cocok” tanpa cakupan. Kalau mengulang, saya akan membuat satu bagian tampilan skor yang memang tidak bisa muncul tanpa data cakupannya.',
      },
    },
  },
  {
    slug: 'face-recognition-attendance',
    seoDescription: {
      id: 'Studi kasus aplikasi absensi pengenalan wajah dari kamera kelas, dengan batas keyakinan 65%, pengaman absen ganda, dan koreksi yang disetujui admin.',
      en: 'Case study of a face-recognition attendance system for classrooms, with a 65% confidence threshold, double-entry protection and admin-approved fixes.',
    },
    seoTitle: { id: 'Aplikasi Absensi Pengenalan Wajah', en: 'Face-Recognition Attendance System' },
    updated: '2026-09-28',
    title: { id: 'Absensi pengenalan wajah', en: 'Face-recognition attendance' },
    problem: {
      id: 'Absensi kertas bisa dititipkan, dan merekapnya memakan waktu berjam-jam.',
      en: 'Paper attendance could be signed on someone else’s behalf, and compiling it took hours.',
    },
    summary: {
      en: 'Class attendance for students and lecturers, recorded by recognising faces from the classroom camera instead of signatures or cards.',
      id: 'Absensi kuliah untuk mahasiswa dan dosen yang dicatat lewat pengenalan wajah dari kamera kelas, tanpa tanda tangan atau kartu.',
    },
    problems: ['ai', 'workflow'],
    year: '2026',
    role: { en: 'Software engineer, sole developer', id: 'Satu-satunya pengembang aplikasi' },
    status: { en: 'Built', id: 'Selesai dibangun' },
    stack: ['Laravel', 'Inertia + React', 'Python', 'face_recognition', 'OpenCV'],
    shots: [
      { src: '/work/ta-sesi-detail.png', width: 2880, height: 1800, kind: 'desktop', alt: { en: 'Attendance session with each student’s status, time and recognition confidence', id: 'Sesi absensi dengan status, waktu, dan tingkat keyakinan setiap mahasiswa' } },
      { src: '/work/ta-dashboard.png', width: 2880, height: 1800, kind: 'desktop', alt: { en: 'Department dashboard with a session in progress and today’s attendance', id: 'Dashboard jurusan dengan sesi yang sedang berlangsung dan kehadiran hari ini' } },

    ],
    caseStudy: {
      brief: {
        audience: { id: 'Kampus: admin jurusan, dosen, dan mahasiswa.', en: 'A campus: department admins, lecturers and students.' },
        problem: {
          id: 'Absensi kertas bisa dititipkan, dan merekapnya makan waktu berjam-jam.',
          en: 'Paper attendance could be signed for someone else, and compiling it took hours.',
        },
        built: {
          id: 'Absensi yang dicatat otomatis dari kamera kelas dengan mengenali wajah, tanpa tanda tangan atau kartu.',
          en: 'Attendance recorded automatically from the classroom camera by recognising faces, with no signatures or cards.',
        },
        result: {
          id: 'Selesai dibangun. Kehadiran baru dicatat kalau sistem minimal 65% yakin, tidak bisa tercatat dua kali, dan koreksi harus disetujui admin.',
          en: 'Built. Attendance is recorded only when the system is at least 65% sure, can never be recorded twice, and corrections need an admin’s approval.',
        },
      },
      context: [
        {
          en: 'Paper attendance can be signed on someone else’s behalf, and compiling it takes hours. The challenge is that faces have to be recognised continuously for the whole class, while an ordinary web application is not built to process video.',
          id: 'Absensi kertas bisa dititipkan, dan merekapnya memakan waktu berjam-jam. Tantangannya, kamera harus mengenali wajah terus-menerus selama kelas berlangsung, padahal aplikasi web biasa tidak dirancang untuk mengolah video.',
        },
      ],
      decisions: [
        {
          id: 'two-services',
          title: { en: 'Two parts with clear jobs', id: 'Dua bagian dengan tugas yang jelas' },
          body: {
            en: 'The main application keeps all the data, including schedules, sessions, face data and attendance. The face-recognition program only watches. Every five seconds it asks which classes are running, fetches the face data for that room, and reports who it sees through a private, locked channel.',
            id: 'Aplikasi utama menyimpan semua data, yaitu jadwal, sesi, data wajah, dan kehadiran. Program pengenal wajah hanya bertugas melihat. Setiap lima detik ia menanyakan kelas mana yang sedang berlangsung, mengambil data wajah untuk ruangan itu, lalu melaporkan siapa yang terlihat lewat jalur khusus yang terkunci.',
          },
        },
        {
          // TODO(Faiz): confirm the reasoning behind the 0.65 threshold.
          id: 'threshold',
          title: { en: 'A stricter confidence threshold', id: 'Batas keyakinan yang lebih ketat' },
          body: {
            en: 'Attendance is recorded only when the system is at least 65% sure, much stricter than the default setting. Asking a student to face the camera again is better than recording them as someone else.',
            id: 'Kehadiran baru dicatat jika sistem minimal 65% yakin, jauh lebih ketat dari pengaturan bawaannya. Lebih baik mahasiswa diminta menghadap kamera sekali lagi daripada tercatat sebagai orang lain.',
          },
        },
        {
          id: 'double-attendance',
          title: { en: 'Two layers against double attendance', id: 'Dua lapis pengaman dari absen ganda' },
          body: {
            en: 'The face-recognition program remembers who it has already reported, and the database refuses a second record for the same person in the same session.',
            id: 'Program pengenal wajah mengingat siapa yang sudah dilaporkan, dan sistem menolak catatan kedua untuk orang yang sama di sesi yang sama.',
          },
        },
        {
          id: 'locked-records',
          title: { en: 'Locked records, approved corrections', id: 'Catatan dikunci, koreksi harus disetujui' },
          body: {
            en: 'Once recorded, attendance is locked. Changes go through a correction flow that an admin approves, so the history can always be audited.',
            id: 'Setelah tercatat, kehadiran dikunci. Perubahan harus lewat alur koreksi yang disetujui admin, sehingga riwayatnya selalu bisa diaudit.',
          },
        },
      ],
      status: {
        en: 'Built for a campus setting, with roles for super admins, department admins, lecturers and students, and a face-recognition service that runs separately from the main application.',
        id: 'Selesai dibangun untuk lingkungan kampus, dengan peran super admin, admin jurusan, dosen, dan mahasiswa, serta layanan pengenalan wajah yang berjalan terpisah dari aplikasi utama.',
      },
    },
  },
  {
    slug: 'sipeg',
    seoDescription: {
      id: 'Studi kasus aplikasi penggajian karyawan outsourcing, dengan kalender gaji per kontrak, potongan BPJS dan kasbon, serta angka yang bisa ditelusuri.',
      en: 'Case study of a payroll system for outsourced staff, with per-contract pay calendars, BPJS and cash-advance deductions, and every number traceable.',
    },
    seoTitle: { id: 'Aplikasi Penggajian Karyawan Outsourcing', en: 'Payroll System for Outsourced Staff' },
    updated: '2026-09-28',
    title: same('SIPEG'),
    problem: {
      id: 'Gaji karyawan yang ditempatkan di banyak klien harus dihitung dengan aturan yang berbeda di tiap kontrak, dan selisih satu rupiah langsung terasa oleh penerima slip gaji.',
      en: 'Pay for staff placed with many clients follows different rules in every contract, and a one-rupiah mistake is felt by the person receiving the payslip.',
    },
    summary: {
      en: 'Payroll for a company that places its staff with many clients, from contract to itemised pay, now used by a client.',
      id: 'Sistem penggajian untuk perusahaan yang menempatkan karyawannya di banyak klien, dari kontrak sampai rincian gaji, kini dipakai klien.',
    },
    problems: ['rules'],
    year: '2026',
    role: { en: 'Sole developer', id: 'Satu-satunya pengembang aplikasi' },
    status: { en: 'In use by a client', id: 'Dipakai klien' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript', 'Tailwind CSS'],
    shots: [
      { src: '/work/sipeg-penggajian.png', width: 2880, height: 1800, kind: 'desktop', alt: { en: 'Payroll period showing base pay, active days, BPJS and cashbon deductions per employee', id: 'Periode penggajian dengan gaji pokok, hari aktif, BPJS, dan potongan kasbon per karyawan' } },
      { src: '/work/sipeg-dashboard.png', width: 2880, height: 1800, kind: 'desktop', alt: { en: 'Payroll dashboard with pay composition per period and margin per contract', id: 'Dashboard penggajian dengan komposisi gaji per periode dan margin per kontrak' } },
    ],
    caseStudy: {
      brief: {
        audience: {
          id: 'Perusahaan outsourcing yang menempatkan karyawannya di banyak klien.',
          en: 'An outsourcing company that places its staff with many clients.',
        },
        problem: {
          id: 'Gaji dihitung dengan aturan berbeda di tiap kontrak, dan selisih satu rupiah langsung terasa oleh karyawan.',
          en: 'Pay follows different rules in every contract, and a one-rupiah mistake is felt by the employee straight away.',
        },
        built: {
          id: 'Sistem penggajian dari kontrak sampai rincian gaji, yang menghitung hari kerja, BPJS, dan cicilan kasbon secara otomatis.',
          en: 'A payroll system from contract to itemised pay that works out days worked, BPJS and salary-advance repayments automatically.',
        },
        result: {
          id: 'Dipakai klien. Setiap baris gaji menunjukkan asal angkanya, jadi admin bisa memeriksanya sendiri.',
          en: 'In use by a client. Every pay line shows where its numbers came from, so admins can check it themselves.',
        },
      },
      context: [
        {
          en: 'Every client contract has its own payday, staff can start mid-period, BPJS contributions differ by position, and employees can take a salary advance (cashbon) that is repaid from their pay. A one-rupiah mistake is felt by the person receiving the payslip.',
          id: 'Setiap kontrak klien punya tanggal gajian sendiri, karyawan bisa mulai di tengah periode, potongan BPJS berbeda per jabatan, dan karyawan bisa meminjam kasbon yang dicicil dari gaji. Selisih satu rupiah langsung terasa oleh orang yang menerima slip gaji.',
        },
      ],
      decisions: [
        {
          id: 'traceable',
          title: { en: 'Every number shows where it came from', id: 'Setiap angka menunjukkan asalnya' },
          body: {
            en: 'Each pay line shows full base pay, active days, the BPJS rate and the cashbon that reduced it. Admins do not have to trust the total, because they can check it line by line.',
            id: 'Setiap baris gaji menampilkan gaji pokok penuh, hari aktif, tarif BPJS, dan kasbon yang memotongnya. Admin tidak perlu sekadar percaya pada total, karena mereka bisa memeriksanya baris per baris.',
          },
        },
        {
          id: 'cashbon-ledger',
          title: { en: 'Cashbon as a ledger, not a balance', id: 'Kasbon sebagai buku besar, bukan saldo' },
          body: {
            en: 'Every deduction is its own entry linked to the loan it repays, so the remaining debt can always be explained.',
            id: 'Setiap potongan menjadi catatan tersendiri yang terhubung ke pinjamannya, sehingga sisa utang selalu bisa dijelaskan.',
          },
        },
        {
          id: 'decimals',
          title: { en: 'Money counted without silent rounding', id: 'Uang dihitung tanpa pembulatan diam-diam' },
          body: {
            en: 'The usual way computers store fractions can drift slightly when numbers are added up. Pay amounts are stored in an exact number format, so totals are right to the last rupiah.',
            id: 'Cara komputer menyimpan angka pecahan biasa bisa meleset sedikit saat dijumlahkan. Nilai gaji disimpan dalam format angka yang pasti, jadi totalnya selalu tepat sampai rupiah terakhir.',
          },
        },
        {
          id: 'pro-rata',
          title: { en: 'Pay follows days worked and each contract’s calendar', id: 'Gaji mengikuti hari kerja dan kalender tiap kontrak' },
          body: {
            en: 'Pay is calculated from active days, and each period follows the payday of its own contract rather than one company-wide date.',
            id: 'Gaji dihitung dari hari aktif, dan setiap periode mengikuti tanggal gajian kontraknya masing-masing, bukan satu tanggal untuk semua.',
          },
        },
        {
          id: 'actuals',
          title: { en: 'The dashboard shows what happened, not a forecast', id: 'Dashboard menampilkan yang terjadi, bukan proyeksi' },
          body: {
            en: 'Contract margins are calculated only from periods that have been processed, so the figures on screen are figures that actually happened.',
            id: 'Margin kontrak hanya dihitung dari periode yang sudah diproses, sehingga angka di layar adalah angka yang benar-benar terjadi.',
          },
        },
      ],
      status: {
        en: 'In use by a client. In September 2026 I rebuilt the part that calculates pay, redesigned the screens and fixed a number of logic errors.',
        id: 'Dipakai klien. Pada September 2026 saya membangun ulang bagian penghitung gajinya, mendesain ulang tampilannya, dan memperbaiki sejumlah kesalahan logika.',
      },
      // TODO(Faiz): add a reflection — what triggered the September rebuild?
    },
  },
  // ── Archive: smaller projects, each with the one decision worth knowing about. ──
  // Client and research projects carry descriptive titles instead of repo names.
  // Projects link to no repositories: the site shows the thinking, not the source code.
  // TODO(Faiz): confirm roles and status for the client projects below (currently "Developer" / "Built").
  {
    slug: 'shareholder-directives',
    title: { id: 'Tindak lanjut arahan rapat pemegang saham', en: 'Follow-up on shareholder meeting directives' },
    problem: {
      id: 'Arahan dari rapat pemegang saham harus ditindaklanjuti setiap bagian perusahaan, dan setiap laporan tindak lanjut diperiksa berjenjang sebelum dinyatakan sesuai.',
      en: 'Directives from a shareholders’ meeting had to be followed up by every division, and each follow-up report went through a tiered review before it was accepted.',
    },
    summary: { id: 'Pemantauan tindak lanjut arahan rapat pemegang saham untuk sebuah BUMN.', en: 'Tracking follow-ups on shareholder meeting directives for a state-owned company.' },
    keyDecision: {
      id: 'Tujuh tahap persetujuan mengikuti jabatan pemeriksa. Permintaan revisi tidak mengulang dari awal. Laporan kembali ke pemeriksa yang memintanya, dan setiap keputusan wajib disertai catatan.',
      en: 'Seven review stages follow the reviewer’s position. A revision request does not restart the chain. The report returns to the reviewer who asked for it, and every decision needs a note.',
    },
    problems: ['workflow'],
    year: '2024',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 10', 'Blade', 'Stisla'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'arahan', label: { id: 'Arahan', en: 'Directive' }, col: 1, row: 0 },
        { id: 'komp', label: { id: 'Bagian', en: 'Division' }, col: 0, row: 0 },
        { id: 'hasil', label: { id: 'Tindak lanjut', en: 'Follow-up' }, col: 2, row: 0 },
        { id: 'dept', label: { id: 'Departemen', en: 'Department' }, col: 0, row: 1 },
        { id: 'user', label: { id: 'Pegawai', en: 'Staff' }, col: 1, row: 1 },
        { id: 'jabatan', label: { id: 'Jabatan', en: 'Position' }, col: 2, row: 1 },
      ],
      edges: [
        ['komp', 'arahan', '1-n'],
        ['arahan', 'hasil', '1-n'],
        ['komp', 'dept', '1-n'],
        ['user', 'hasil', '1-n'],
        ['jabatan', 'user', '1-n'],
      ],
    },
  },
  {
    slug: 'task-handover',
    title: { id: 'Serah-terima tugas tim', en: 'Team task handover' },
    problem: {
      id: 'Tim perlu tahu siapa yang sedang memegang setiap tugas, dan kapan tepatnya tanggung jawab itu berpindah ke orang lain.',
      en: 'A team needed to know who holds each task, and exactly when responsibility moves to someone else.',
    },
    summary: { id: 'Manajemen tugas dengan klaim, serah-terima, dan penyerahan hasil kerja.', en: 'Task management with claiming, handovers and work submission.' },
    keyDecision: {
      id: 'Serah-terima adalah permintaan, bukan pemindahan langsung. Tanggung jawab baru berpindah setelah penerima menyetujui. Penolakan wajib beralasan, dan setiap langkah tercatat di log aktivitas.',
      en: 'A handover is a request, not a transfer. Responsibility moves only once the recipient accepts. Rejections need a reason, and every step goes into the activity log.',
    },
    problems: ['workflow'],
    year: '2026',
    role: { id: 'Satu-satunya pengembang aplikasi', en: 'Sole developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'task', label: { id: 'Tugas', en: 'Task' }, col: 1, row: 0 },
        { id: 'user', label: { id: 'Pengguna', en: 'User' }, col: 0, row: 0 },
        { id: 'handover', label: { id: 'Serah-terima', en: 'Handover' }, col: 2, row: 0 },
        { id: 'comment', label: { id: 'Komentar', en: 'Comment' }, col: 0, row: 1 },
        { id: 'activity', label: { id: 'Log aktivitas', en: 'Activity log' }, col: 2, row: 1 },
      ],
      edges: [
        ['user', 'task', '1-n'],
        ['task', 'handover', '1-n'],
        ['task', 'comment', '1-n'],
        ['task', 'activity', '1-n'],
      ],
    },
  },
  {
    slug: 'service-requests',
    title: { id: 'Pengajuan layanan & verifikasi berkas', en: 'Service requests & document checks' },
    problem: {
      id: 'Setiap jenis layanan mensyaratkan berkas yang berbeda, dan pemohon harus tahu persis berkas mana yang masih kurang atau ditolak.',
      en: 'Every service requires different documents, and applicants need to know exactly which ones are missing or rejected.',
    },
    summary: { id: 'Pengajuan layanan dengan syarat berkas per jenis layanan.', en: 'Service requests with required documents per service type.' },
    keyDecision: {
      id: 'Berkas diperiksa satu per satu, bukan per pengajuan. Berkas yang ditolak wajib diberi keterangan, jadi pemohon cukup mengunggah ulang berkas itu saja.',
      en: 'Documents are checked one by one, not per application. A rejected document must come with a note, so the applicant re-uploads only that file.',
    },
    problems: ['workflow'],
    year: '2025',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'pengajuan', label: { id: 'Pengajuan', en: 'Request' }, col: 1, row: 0 },
        { id: 'layanan', label: { id: 'Layanan', en: 'Service' }, col: 0, row: 0 },
        { id: 'jenis', label: { id: 'Jenis berkas', en: 'Document type' }, col: 0, row: 1 },
        { id: 'berkas', label: { id: 'Berkas', en: 'Document' }, col: 1, row: 1 },
      ],
      edges: [
        ['layanan', 'pengajuan', '1-n'],
        ['layanan', 'jenis', 'n-n'],
        ['pengajuan', 'berkas', '1-n'],
        ['jenis', 'berkas', '1-n'],
      ],
    },
  },
  {
    slug: 'procurement',
    seoDescription: {
      id: 'Studi kasus sistem permintaan dan pengadaan barang yang otomatis membeli hanya sebesar kekurangan stok, lengkap dengan persetujuan dan laporan PDF.',
      en: 'Case study of a stock request and procurement system that automatically buys only the stock shortfall, with approvals and PDF reports.',
    },
    seoTitle: { id: 'Sistem Permintaan dan Pengadaan Barang', en: 'Stock Request and Procurement System' },
    updated: '2026-09-28',
    title: { id: 'Permintaan & pengadaan barang', en: 'Stock requests & procurement' },
    problem: {
      id: 'Permintaan barang dari unit kerja harus dicocokkan dengan stok gudang dan pembelian ke vendor, supaya kekurangan terlihat sebelum barangnya dibutuhkan.',
      en: 'Requests from work units had to be matched against warehouse stock and vendor purchases, so shortages show up before the items are needed.',
    },
    summary: {
      id: 'Permintaan barang dari unit kerja, stok gudang, dan pengadaan ke vendor dalam satu alur, dengan aturan yang membedakan kebutuhan rutin dan mendesak.',
      en: 'Requests from work units, warehouse stock and vendor procurement in one flow, with rules that treat routine and urgent needs differently.',
    },
    keyDecision: {
      id: 'Permintaan mendesak otomatis membuat pengadaan, tapi hanya sebesar kekurangannya, yaitu jumlah yang diminta dikurangi stok yang tersedia.',
      en: 'An urgent request automatically creates a procurement, but only for the shortfall, meaning the quantity requested minus the stock available.',
    },
    problems: ['rules', 'records'],
    year: '2026',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    // TODO(Faiz): confirm role and status (built for a research project).
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript', 'Recharts'],
    shots: [
      { src: '/work/procurement-requests.png', width: 2880, height: 1800, kind: 'desktop', alt: { en: 'Requests list with urgency and status, showing urgent requests in progress or done, routine ones pooled and one rejected', id: 'Daftar permintaan dengan urgensi dan status, berisi permintaan mendesak yang diproses atau selesai, permintaan rutin yang dikumpulkan, dan satu yang ditolak' } },
      { src: '/work/procurement-dashboard.png', width: 2880, height: 1800, kind: 'desktop', alt: { en: 'Dashboard with low-stock items, recent procurements and recent requests', id: 'Dashboard dengan stok menipis, pengadaan terbaru, dan permintaan terbaru' } },
    ],
    caseStudy: {
      // Built for a research project, so the brief never claims a client or use in production.
      brief: {
        audience: { id: 'Kantor yang unit kerjanya meminta barang ke gudang.', en: 'An office whose work units request items from a warehouse.' },
        problem: {
          id: 'Permintaan yang disetujui tanpa melihat stok berujung barang kosong, dan pembelian tanpa melihat permintaan berujung stok menumpuk.',
          en: 'Approving requests without checking stock means promising items that are not there, and buying without checking requests piles up stock.',
        },
        built: {
          id: 'Satu alur dari permintaan, stok, sampai pengadaan. Permintaan mendesak langsung dicek ke stok, dan sistem hanya membeli sebesar kekurangannya.',
          en: 'One flow from request to stock to purchase. Urgent requests are checked against stock on the spot, and the system buys only the shortfall.',
        },
        result: {
          id: 'Selesai dibangun, dengan akses terpisah untuk Admin, Tata Usaha, dan Kepala Bidang, laporan PDF, dan ringkasan yang menandai stok menipis.',
          en: 'Built, with separate access for Admin, Administration and Division Head, PDF reports and a dashboard that flags low stock.',
        },
      },
      context: [
        {
          id: 'Unit kerja mengajukan permintaan barang, gudang mencatat stok, dan bagian pengadaan membeli ke vendor. Ketiganya saling bergantung. Permintaan yang disetujui tanpa melihat stok berujung pada barang yang tidak ada, dan pembelian tanpa melihat permintaan berujung pada stok yang menumpuk.',
          en: 'Work units request items, the warehouse keeps stock, and procurement buys from vendors. The three depend on each other. Approving a request without looking at stock promises items that are not there, and buying without looking at requests piles up stock.',
        },
        {
          id: 'Tidak semua permintaan sama. Kebutuhan mendesak tidak bisa menunggu rekap, sementara kebutuhan rutin lebih hemat jika dikumpulkan lalu dipenuhi sekaligus. Aturannya harus membedakan keduanya tanpa membuat petugas menghitung manual.',
          en: 'Not every request is the same. Urgent needs cannot wait for a monthly round-up, while routine needs are cheaper to pool and fulfil together. The rules had to treat the two differently without anyone doing the arithmetic by hand.',
        },
      ],
      decisions: [
        {
          id: 'shortfall-only',
          title: { id: 'Pengadaan otomatis hanya sebesar kekurangannya', en: 'Automatic procurement covers only the shortfall' },
          body: {
            id: 'Permintaan mendesak langsung dicek ke stok. Kalau cukup, permintaan selesai saat itu juga. Kalau kurang, sistem membuat pengadaan hanya untuk selisihnya, yaitu jumlah yang diminta dikurangi stok yang tersedia, bukan untuk seluruh jumlah.',
            en: 'An urgent request is checked against stock immediately. If there is enough, it is fulfilled on the spot. If not, the system creates a procurement for the difference only, the quantity requested minus the stock available, not for the whole amount.',
          },
        },
        {
          id: 'recheck-on-arrival',
          title: { id: 'Stok dicek ulang saat barang datang', en: 'Stock is rechecked when goods arrive' },
          body: {
            id: 'Begitu pengadaan ditandai selesai, stok bertambah dan permintaan mendesak yang menunggunya diperiksa ulang. Permintaan itu selesai dengan sendirinya, tanpa ada yang perlu mengingat untuk memprosesnya lagi.',
            en: 'As soon as a procurement is marked complete, stock goes up and the urgent request waiting on it is checked again. It completes by itself, without anyone having to remember to process it.',
          },
        },
        {
          id: 'pooled-demand',
          title: { id: 'Kebutuhan rutin dikumpulkan sebelum disetujui', en: 'Routine needs are pooled before approval' },
          body: {
            id: 'Permintaan rutin menambah total kebutuhan per barang. Persetujuan massal ditolak selama masih ada barang yang stoknya tidak cukup, lengkap dengan nama barang dan selisihnya, dan sistem menyiapkan satu pengadaan untuk semua kekurangan itu.',
            en: 'Routine requests add up to a total demand per item. Batch approval is refused while any item is short, naming the item and the gap, and the system prepares a single procurement for all of the shortfalls.',
          },
        },
        {
          id: 'users-words',
          title: { id: 'Sistem memakai istilah pemakainya sendiri', en: 'The system uses the users’ own words' },
          body: {
            id: 'Di tengah pengembangan, istilah pembelian dan pengajuan di dalam sistem diganti menjadi pengadaan dan permintaan, kata yang dipakai pengguna sehari-hari. Ketika sistem dan pemakainya memakai kata yang sama, aturan bisnis lebih sulit disalahpahami.',
            en: 'Midway through, the terms purchase and submission inside the system were renamed to procurement and request, the words the users actually use. When the system and its users share a vocabulary, business rules are harder to misunderstand.',
          },
        },
        {
          id: 'safe-migration',
          title: { id: 'Merapikan data tanpa kehilangan isinya', en: 'Tidying the data without losing any of it' },
          body: {
            id: 'Tipe barang yang semula diketik bebas dipindah menjadi daftar pilihan tetap dalam tiga langkah. Daftar baru dibuat dan diisi dari data lama, baru setelah itu isian lama dihapus. Harga dan jumlah yang sempat tersimpan sebagai teks juga diubah menjadi angka.',
            en: 'Item types that used to be typed freely became a fixed list in three steps. The new list was created and filled from the old data, and only then was the old field removed. Prices and quantities that had been stored as text became numbers.',
          },
        },
      ],
      status: {
        id: 'Selesai dibangun, dengan peran Admin, Tata Usaha, dan Kepala Bidang, laporan PDF untuk barang, permintaan, dan pengadaan, serta halaman ringkasan yang menandai stok menipis dan kekurangan.',
        en: 'Built, with Admin, Administration and Division Head roles, PDF reports for items, requests and procurements, and a dashboard that flags low stock and shortfalls.',
      },
    },

    diagram: {
      nodes: [
        { id: 'permintaan', label: { id: 'Permintaan', en: 'Request' }, col: 0, row: 0 },
        { id: 'barang', label: { id: 'Barang', en: 'Item' }, col: 1, row: 0 },
        { id: 'pengadaan', label: { id: 'Pengadaan', en: 'Procurement' }, col: 2, row: 0 },
        { id: 'tipe', label: { id: 'Tipe barang', en: 'Item type' }, col: 0, row: 1 },
        { id: 'vendor', label: same('Vendor'), col: 2, row: 1 },
      ],
      edges: [
        ['permintaan', 'barang', 'n-n'],
        ['pengadaan', 'barang', 'n-n'],
        ['vendor', 'pengadaan', '1-n'],
        ['vendor', 'barang', 'n-n'],
        ['tipe', 'barang', '1-n'],
      ],
    },
  },
  {
    slug: 'equipment-loans',
    title: { id: 'Peminjaman peralatan kantor', en: 'Office equipment loans' },
    problem: {
      id: 'Karyawan meminjam peralatan kantor, dan perusahaan perlu tahu siapa memegang barang apa, sejak kapan, dan dalam kondisi apa barang itu kembali.',
      en: 'Staff borrow office equipment, and the company needs to know who has what, since when, and in what condition it comes back.',
    },
    summary: { id: 'Aplikasi mobile peminjaman peralatan untuk sebuah BUMN.', en: 'A mobile equipment-loan app for a state-owned company.' },
    keyDecision: {
      id: 'Stok dicek dan langsung berkurang saat peminjaman dibuat. Saat barang kembali, foto kondisinya disimpan bersama catatan pengembalian dan stok dipulihkan.',
      en: 'Stock is checked and reduced the moment a loan is made. When the item comes back, a photo of its condition is stored with the return and the stock is restored.',
    },
    problems: ['records'],
    year: '2024',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Expo (React Native)', 'Laravel 11 API'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'loan', label: { id: 'Peminjaman', en: 'Loan' }, col: 1, row: 0 },
        { id: 'user', label: { id: 'Karyawan', en: 'Employee' }, col: 0, row: 0 },
        { id: 'item', label: { id: 'Barang', en: 'Item' }, col: 2, row: 0 },
        { id: 'category', label: { id: 'Kategori', en: 'Category' }, col: 2, row: 1 },
      ],
      edges: [
        ['user', 'loan', '1-n'],
        ['item', 'loan', '1-n'],
        ['category', 'item', '1-n'],
      ],
    },
  },
  {
    slug: 'case-files',
    title: { id: 'Berkas perkara penyidik', en: 'Investigation case files' },
    problem: {
      id: 'Penyidik perlu menyusun satu perkara dari banyak bagian, mulai dari pelaku, saksi, keterangan, dan bukti sampai pasal yang dikenakan.',
      en: 'Investigators need to assemble one case from many parts, from suspects, witnesses, statements and evidence to the articles charged.',
    },
    summary: { id: 'Pengelolaan berkas perkara untuk unit penyidik.', en: 'Case-file management for an investigation unit.' },
    keyDecision: {
      id: 'Pasal dicatat per pelaku di setiap perkara, bukan per perkara, karena dalam satu perkara setiap pelaku bisa dikenai pasal yang berbeda.',
      en: 'Articles are recorded per suspect within each case, not per case, because suspects in the same case can be charged under different articles.',
    },
    problems: ['records'],
    year: '2025',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'case', label: { id: 'Perkara', en: 'Case' }, col: 1, row: 0 },
        { id: 'suspect', label: { id: 'Pelaku', en: 'Suspect' }, col: 0, row: 0 },
        { id: 'witness', label: { id: 'Saksi', en: 'Witness' }, col: 2, row: 0 },
        { id: 'article', label: { id: 'Pasal', en: 'Article' }, col: 0, row: 1 },
        { id: 'interview', label: { id: 'Pemeriksaan', en: 'Interview' }, col: 1, row: 1 },
        { id: 'officer', label: { id: 'Penyidik', en: 'Investigator' }, col: 2, row: 1 },
      ],
      edges: [
        ['case', 'suspect', 'n-n'],
        ['case', 'witness', 'n-n'],
        ['suspect', 'article', 'n-n'],
        ['case', 'interview', '1-n'],
        ['case', 'officer', 'n-n'],
      ],
    },
  },
  {
    slug: 'signal-map',
    title: { id: 'Pemetaan kualitas sinyal seluler', en: 'Mobile signal quality mapping' },
    problem: {
      id: 'Kualitas sinyal tiap provider berbeda di setiap desa, dan datanya perlu bisa dibandingkan di peta maupun dari waktu ke waktu.',
      en: 'Signal quality differs by provider in every village, and the data needs to be comparable on a map and over time.',
    },
    summary: { id: 'Pencatatan dan peta kualitas sinyal per desa dan provider.', en: 'Recording and mapping signal quality per village and provider.' },
    keyDecision: {
      id: 'Setiap pengukuran disimpan sebagai catatan baru per desa, provider, dan tanggal, bukan menimpa nilai lama, sehingga perubahan kualitas sinyal bisa dilihat dari waktu ke waktu.',
      en: 'Each measurement is stored as a new record per village, provider and date instead of overwriting the old value, so changes in signal quality can be seen over time.',
    },
    problems: ['records'],
    year: '2025',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'Leaflet', 'Recharts'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'measure', label: { id: 'Pengukuran', en: 'Measurement' }, col: 1, row: 0 },
        { id: 'village', label: { id: 'Desa', en: 'Village' }, col: 0, row: 0 },
        { id: 'provider', label: same('Provider'), col: 2, row: 0 },
        { id: 'level', label: { id: 'Kategori sinyal', en: 'Signal level' }, col: 1, row: 1 },
      ],
      edges: [
        ['village', 'measure', '1-n'],
        ['provider', 'measure', '1-n'],
        ['level', 'measure', '1-n'],
      ],
    },
  },
  {
    slug: 'price-monitor',
    title: { id: 'Pemantauan harga bahan baku', en: 'Raw-material price monitoring' },
    problem: {
      id: 'Harga bahan baku berbeda di tiap pasar dan berubah setiap hari, sementara laporannya perlu merangkum rentang waktu tertentu.',
      en: 'Raw-material prices differ between markets and change daily, while reports need to summarise a chosen period.',
    },
    summary: { id: 'Pencatatan harga bahan baku per pasar, dengan laporan per periode.', en: 'Raw-material prices per market, with reports per period.' },
    keyDecision: {
      id: 'Setiap harga dicatat sebagai pengamatan tersendiri, lengkap dengan bahan, pasar, tanggal, dan petugasnya, dalam format angka yang pasti. Jadi riwayat dan perbandingannya tidak pernah hilang.',
      en: 'Every price is recorded as its own observation, with the material, market, date and officer, in an exact number format. The history and comparisons are never lost.',
    },
    problems: ['records'],
    year: '2025',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'Recharts', 'DomPDF'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'price', label: { id: 'Harga', en: 'Price' }, col: 1, row: 0 },
        { id: 'material', label: { id: 'Bahan baku', en: 'Material' }, col: 0, row: 0 },
        { id: 'officer', label: { id: 'Petugas', en: 'Officer' }, col: 1, row: 1 },
        { id: 'report', label: { id: 'Laporan', en: 'Report' }, col: 2, row: 1 },
      ],
      edges: [
        ['material', 'price', '1-n'],
        ['officer', 'price', '1-n'],
        ['officer', 'report', '1-n'],
      ],
    },
  },
  {
    slug: 'mood-orders',
    title: { id: 'Pemesanan minuman dengan deteksi emosi', en: 'Drink orders with emotion detection' },
    problem: {
      id: 'Sebuah kafe ingin pelanggan memesan langsung dari meja, dan mendapat rekomendasi minuman yang sesuai dengan suasana hatinya.',
      en: 'A café wanted customers to order straight from their table and get drink suggestions that match their mood.',
    },
    summary: { id: 'Pemesanan dari meja dengan rekomendasi berbasis emosi suara.', en: 'Table ordering with voice-emotion recommendations.' },
    keyDecision: {
      id: 'Pengenal emosi dari suara, yang membedakan enam jenis emosi, berjalan sebagai program terpisah. Aplikasi pemesanan hanya menerima hasil emosinya lalu mencocokkannya dengan minuman.',
      en: 'Emotion recognition from the customer’s voice, covering six emotions, runs as a separate program. The ordering app only receives the detected emotion and matches it to drinks.',
    },
    problems: ['ai', 'public'],
    year: '2025',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Laravel 12', 'React 19', 'Python', 'PyTorch', 'Flask'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'emotion', label: { id: 'Emosi', en: 'Emotion' }, col: 2, row: 1 },
        { id: 'order', label: { id: 'Pesanan', en: 'Order' }, col: 1, row: 0 },
        { id: 'drink', label: { id: 'Minuman', en: 'Drink' }, col: 2, row: 0 },
        { id: 'voice', label: { id: 'Rekaman suara', en: 'Voice clip' }, col: 0, row: 1 },
        { id: 'model', label: { id: 'Model suara', en: 'Voice model' }, col: 1, row: 1 },
      ],
      edges: [
        ['order', 'drink', 'n-n'],
        ['voice', 'model', 'flow'],
        ['model', 'emotion', 'flow'],
        ['emotion', 'drink', '1-n'],
      ],
    },
  },
  {
    slug: 'acupoint-detection',
    title: { id: 'Deteksi titik akupresur', en: 'Acupressure point detection' },
    problem: {
      id: 'Sebuah penelitian membutuhkan lokasi titik akupresur di tangan dan deteksi telinga dari foto, tanpa data acuan yang ditandai manual.',
      en: 'A research project needed acupressure points located on the hand and ears detected from photos, without manually labelled reference data.',
    },
    summary: { id: 'Deteksi tangan dan telinga dari foto yang berjalan bersamaan.', en: 'Hand and ear detection from photos, running side by side.' },
    keyDecision: {
      id: 'Karena tidak ada data acuan yang ditandai manual, ketepatan hasilnya diperiksa lewat bentuk tangan. Titik harus segaris dengan arah lengan, dan jaraknya harus masuk akal secara anatomi.',
      en: 'With no manually labelled reference data, accuracy is checked through the shape of the hand. The point must lie on the line of the forearm, at a distance that makes anatomical sense.',
    },
    problems: ['ai'],
    year: '2026',
    role: { id: 'Pengembang aplikasi', en: 'Developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Python', 'MediaPipe', 'YOLOv8', 'OpenCV'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'check', label: { id: 'Cek bentuk tangan', en: 'Hand-shape check' }, col: 2, row: 1 },
        { id: 'hand', label: { id: 'Foto tangan', en: 'Hand photo' }, col: 0, row: 0 },
        { id: 'landmarks', label: { id: 'Titik tangan', en: 'Hand points' }, col: 1, row: 0 },
        { id: 'point', label: { id: 'Titik akupresur', en: 'Acupressure point' }, col: 2, row: 0 },
        { id: 'ear', label: { id: 'Foto telinga', en: 'Ear photo' }, col: 0, row: 1 },
        { id: 'yolo', label: { id: 'Deteksi telinga', en: 'Ear detection' }, col: 1, row: 1 },
      ],
      edges: [
        ['hand', 'landmarks', 'flow'],
        ['landmarks', 'point', 'flow'],
        ['point', 'check', 'flow'],
        ['ear', 'yolo', 'flow'],
      ],
    },
  },
  {
    slug: 'study-methods',
    title: { id: 'Rekomendasi metode belajar', en: 'Study-method recommendations' },
    problem: {
      id: 'Pelajar sering tidak tahu metode belajar mana yang cocok dengan gaya belajar, tujuan, dan waktu yang mereka punya.',
      en: 'Students often cannot tell which study method suits their learning style, goals and available time.',
    },
    summary: { id: 'Rekomendasi metode belajar dari kuesioner gaya belajar.', en: 'Study-method recommendations from a learning-style questionnaire.' },
    keyDecision: {
      id: 'Model AI sederhana memilih satu dari tujuh metode berdasarkan tujuh jawaban kuesioner. AI generatif hanya menjelaskan hasil itu, tidak ikut memutuskan.',
      en: 'A simple machine-learning model picks one of seven methods from seven questionnaire answers. A generative AI only explains that result and does not take part in the decision.',
    },
    problems: ['ai'],
    year: '2024',
    role: { id: 'Satu-satunya pengembang aplikasi', en: 'Sole developer' },
    status: { id: 'Selesai dibangun', en: 'Built' },
    stack: ['Next.js', 'Flask', 'scikit-learn (KNN)', 'Gemini'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'knn', label: { id: 'Model pemilih', en: 'Picking model' }, col: 1, row: 0 },
        { id: 'form', label: { id: 'Kuesioner', en: 'Questionnaire' }, col: 0, row: 0 },
        { id: 'method', label: { id: 'Metode belajar', en: 'Study method' }, col: 2, row: 0 },
        { id: 'llm', label: { id: 'Penjelasan AI', en: 'AI explanation' }, col: 2, row: 1 },
      ],
      edges: [
        ['form', 'knn', 'flow'],
        ['knn', 'method', 'flow'],
        ['method', 'llm', 'flow'],
      ],
    },
  },
  {
    slug: 'fitverse',
    title: same('FitVerse'),
    problem: {
      id: 'Gym perlu mengelola jadwal kelas, booking fasilitas, membership, dan bukti bayar di satu tempat, dengan tampilan berbeda untuk member dan trainer.',
      en: 'A gym needed class schedules, facility bookings, memberships and payment proofs in one place, with separate views for members and trainers.',
    },
    summary: {
      en: 'Gym management with class schedules, facility booking, membership packages and payment proof, plus separate views for members and trainers.',
      id: 'Manajemen gym dengan jadwal kelas, booking fasilitas, paket membership, dan bukti bayar, serta tampilan terpisah untuk member dan trainer.',
    },
    keyDecision: {
      id: 'Kapasitas dihitung dari semua booking yang waktunya tumpang-tindih. Kalau penuh, member masuk daftar tunggu berbatas, dan antrean pertama otomatis dikonfirmasi saat ada pembatalan.',
      en: 'Capacity counts every booking whose time overlaps. When it is full, members join a capped waitlist, and the first in line is confirmed automatically when someone cancels.',
    },
    problems: ['rules', 'public'],
    year: '2026',
    role: { en: 'Sole developer', id: 'Satu-satunya pengembang aplikasi' },
    status: { en: 'Built', id: 'Selesai dibangun' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'booking', label: same('Booking'), col: 1, row: 0 },
        { id: 'facility', label: { id: 'Fasilitas', en: 'Facility' }, col: 0, row: 0 },
        { id: 'member', label: same('Member'), col: 2, row: 0 },
        { id: 'session', label: { id: 'Sesi kelas', en: 'Class session' }, col: 1, row: 1 },
        { id: 'subscription', label: { id: 'Langganan', en: 'Subscription' }, col: 2, row: 1 },
      ],
      edges: [
        ['facility', 'booking', '1-n'],
        ['member', 'booking', '1-n'],
        ['member', 'session', 'n-n'],
        ['member', 'subscription', '1-n'],
      ],
    },
  },
  {
    slug: 'eventura',
    title: same('Eventura'),
    problem: {
      id: 'Calon penyewa perlu membandingkan paket, portofolio, dan harga vendor acara secara berdampingan sebelum meminta penawaran.',
      en: 'People hiring for an event needed to compare vendors’ packages, portfolios and prices side by side before asking for a quote.',
    },
    summary: {
      en: 'A marketplace for event vendors, with service packages, portfolios, side-by-side comparison and inquiries.',
      id: 'Marketplace vendor acara dengan paket layanan, portofolio, perbandingan berdampingan, dan permintaan penawaran.',
    },
    keyDecision: {
      id: 'Vendor masuk lewat pendaftaran yang disetujui admin, dan tanggal yang sudah penuh tampil di halaman vendor, jadi penyewa tidak meminta penawaran untuk tanggal yang tidak tersedia.',
      en: 'Vendors join through an application an admin approves, and their unavailable dates show on their page, so nobody asks for a quote on a date that is already taken.',
    },
    problems: ['public'],
    year: '2026',
    role: { en: 'Sole developer', id: 'Satu-satunya pengembang aplikasi' },
    status: { en: 'Built', id: 'Selesai dibangun' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'vendor', label: same('Vendor'), col: 1, row: 0 },
        { id: 'package', label: { id: 'Paket', en: 'Package' }, col: 0, row: 0 },
        { id: 'inquiry', label: { id: 'Penawaran', en: 'Inquiry' }, col: 2, row: 0 },
        { id: 'portfolio', label: { id: 'Portofolio', en: 'Portfolio' }, col: 0, row: 1 },
        { id: 'application', label: { id: 'Pendaftaran', en: 'Application' }, col: 1, row: 1 },
        { id: 'blocked', label: { id: 'Tanggal penuh', en: 'Blocked date' }, col: 2, row: 1 },
      ],
      edges: [
        ['vendor', 'package', '1-n'],
        ['vendor', 'inquiry', '1-n'],
        ['vendor', 'portfolio', '1-n'],
        ['application', 'vendor', '1-1'],
        ['vendor', 'blocked', '1-n'],
      ],
    },
  },
  {
    slug: 'budaya-sumsel',
    title: same('Budaya Sumsel'),
    problem: {
      id: 'Arsip budaya daerah butuh kontribusi dari masyarakat, tapi setiap kiriman harus diperiksa dulu sebelum tayang.',
      en: 'A regional culture archive needed contributions from the public, but every submission had to be checked before going live.',
    },
    summary: {
      en: 'A community archive of South Sumatran culture, with public contributions, moderation and contributor levels.',
      id: 'Arsip komunitas budaya Sumatera Selatan, dengan kontribusi publik, moderasi, dan level kontributor.',
    },
    keyDecision: {
      id: 'Setiap kiriman diperiksa moderator dan setiap keputusannya tercatat. Kontributor melampirkan surat pernyataan untuk karyanya, dan levelnya naik dari jumlah konten yang disetujui.',
      en: 'Every submission is reviewed and each moderation decision is logged. Contributors attach a signed statement for their work, and their level rises with the number of approved entries.',
    },
    problems: ['public', 'workflow'],
    year: '2026',
    role: { en: 'Sole developer', id: 'Satu-satunya pengembang aplikasi' },
    status: { en: 'Built', id: 'Selesai dibangun' },
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript'],
    shots: [],
    diagram: {
      nodes: [
        { id: 'entry', label: { id: 'Konten budaya', en: 'Cultural entry' }, col: 1, row: 0 },
        { id: 'contributor', label: { id: 'Kontributor', en: 'Contributor' }, col: 0, row: 0 },
        { id: 'log', label: { id: 'Log moderasi', en: 'Moderation log' }, col: 2, row: 0 },
        { id: 'statement', label: { id: 'Surat pernyataan', en: 'Statement' }, col: 0, row: 1 },
        { id: 'region', label: { id: 'Wilayah', en: 'Region' }, col: 1, row: 1 },
        { id: 'category', label: { id: 'Kategori', en: 'Category' }, col: 2, row: 1 },
      ],
      edges: [
        ['contributor', 'entry', '1-n'],
        ['entry', 'log', '1-n'],
        ['entry', 'statement', '1-1'],
        ['region', 'entry', '1-n'],
        ['category', 'entry', '1-n'],
      ],
    },
  },
];

// Display order for visitors: work a business owner relates to comes first. Unlisted projects keep their order.
const CASE_ORDER = ['sipeg', 'procurement', 'face-recognition-attendance', 'albatros'];
const ARCHIVE_FIRST = ['price-monitor', 'equipment-loans', 'shareholder-directives'];
const byOrder = (order: string[]) => (a: Project, b: Project) => {
  const rank = (p: Project) => (order.includes(p.slug) ? order.indexOf(p.slug) : order.length);
  return rank(a) - rank(b);
};

export const caseStudies = projects.filter((p) => p.caseStudy).sort(byOrder(CASE_ORDER));
export const archive = projects.filter((p) => !p.caseStudy).sort(byOrder(ARCHIVE_FIRST));
