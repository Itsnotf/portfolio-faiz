# Checklist SEO & AI di luar situs

Situs sudah siap dari sisi kode. Langkah di bawah ini yang membuat Google, Bing, dan asisten AI (ChatGPT, Gemini,
Claude, Perplexity) **menemukan, mempercayai, dan mengutip** situsmu. Kerjakan berurutan.

Cara AI menemukan situs ini:

| Asisten | Sumber utamanya | Yang paling berpengaruh |
|---|---|---|
| ChatGPT (search) | Indeks **Bing** | Bing Webmaster Tools + IndexNow |
| Gemini, AI Overviews | Peringkat **Google** | Search Console, Google Business Profile, ulasan |
| Claude, Perplexity | Crawler sendiri + indeks web | Situs bisa dirambah (sudah), disebut di situs lain |

---

## 1. Hari pertama setelah deploy

- [ ] Di Netlify (*Project configuration → Domain management*), pasang domainmu. Lalu di *Environment variables*, isi
      atau ubah variabel berikut dan jalankan deploy ulang (*Deploys → Trigger deploy*).
  - `NEXT_PUBLIC_SITE_URL` = `https://domainmu.com` (tanpa garis miring di akhir)
  - `GOOGLE_SITE_VERIFICATION` = kode dari langkah Search Console di bawah
  - `BING_SITE_VERIFICATION` = kode dari Bing (boleh dilewati kalau impor dari Search Console)
- [ ] **Google Search Console** (search.google.com/search-console)
  1. Tambah properti jenis *URL prefix* dengan alamat domainmu.
  2. Pilih verifikasi *HTML tag*, salin nilai `content="..."`, isi ke `GOOGLE_SITE_VERIFICATION`, redeploy, klik Verify.
  3. Menu *Sitemaps*, kirim `sitemap.xml`.
  4. Menu *URL Inspection*, minta pengindeksan untuk beranda, 4 halaman layanan, dan halaman Palembang.
- [ ] **Bing Webmaster Tools** (bing.com/webmasters). Pilih *Import from Google Search Console*, jadi tidak perlu
      verifikasi ulang. Pastikan sitemap ikut terkirim. Ini jalur utama ke ChatGPT.
- [ ] Beri tahu Bing dan mesin IndexNow lain tentang semua halaman.
      ```bash
      NEXT_PUBLIC_SITE_URL=https://domainmu.com npm run indexnow
      ```
- [ ] Uji data terstruktur di **Rich Results Test** (search.google.com/test/rich-results) untuk satu halaman layanan dan
      satu artikel. Yang diharapkan muncul adalah Breadcrumb dan Article. Catatan: sejak 2023 Google hanya menampilkan
      kotak FAQ untuk situs pemerintah dan kesehatan, jadi FAQ tidak akan tampil sebagai kotak di hasil Google. Datanya
      tetap berguna untuk Bing dan asisten AI.

## 2. Profil bisnis lokal (untuk "jasa pembuatan aplikasi Palembang")

- [ ] **Google Business Profile** (business.google.com)
  - Nama: Faiz Aflah Hafizuddin (atau nama usaha kalau kamu memakai Berkala Digital untuk jasa ini, tapi pilih satu dan
    konsisten).
  - Kategori utama: *Software company*. Tambahan: *Website designer* jika relevan.
  - Jenis: **usaha area layanan**, sembunyikan alamat rumah. Area layanan Palembang dan Sumatera Selatan.
  - Deskripsi: pakai **bio baku** di bawah.
  - Website: domainmu. Tambahkan layanan sesuai 4 halaman layanan.
- [ ] **Bing Places** (bingplaces.com). Impor dari Google Business Profile.
- [ ] Setelah proyek selesai, minta klien menulis ulasan di Google yang menyebut apa yang dibangun (misalnya "sistem
      penggajian"). Jangan pernah membuat atau memesan ulasan palsu.

## 3. Profil yang menaut ke situs (supaya AI tahu ini orang yang sama)

Semua profil memakai **nama yang sama persis**, **bio baku yang sama**, dan **tautan ke domainmu**.

- [ ] **GitHub** (github.com/Itsnotf). Isi kolom *Website* dan buat profile README berisi bio baku plus tautan ke
      situs dan artikel.
- [ ] **Situs Berkala Digital**. Tambahkan nama dan tautan ke situsmu di halaman tentang atau tim, sebagai pendiri.
- [ ] **Platform freelance**. Projects.co.id dan Sribulancer (klien Indonesia), Upwork dan Contra (klien global).
      Pakai bio baku, tautkan studi kasus, bukan repo.
- [ ] **LinkedIn** (opsional, kamu belum punya). Kalau nanti membuat, pakai headline dan bio baku di bawah, lalu isi
      URL-nya di `profile.linkedin` pada `src/content/profile.ts` supaya situs ikut menautkannya.
- [ ] Jangan menyebut nama klien atau proyek Loranet di profil mana pun.

### Bio baku

Salin apa adanya. Sumbernya `profile.bio` di `src/content/profile.ts`. Kalau bio di situ diubah, ubah juga di semua
profil.

**Indonesia**

> Faiz Aflah Hafizuddin adalah software engineer di Palembang yang membangun sistem informasi, aplikasi web dan mobile,
> serta fitur AI untuk kebutuhan bisnis. Saat ini ia bekerja sebagai software developer di Loranet Technologies PLT,
> Malaysia, sambil menjalankan Berkala Digital, agensi digital kreatif yang ia dirikan di Palembang pada 2025. Ia
> melayani klien di Palembang, seluruh Indonesia, dan jarak jauh, dalam bahasa Indonesia maupun Inggris.

**English**

> Faiz Aflah Hafizuddin is a software engineer based in Palembang, Indonesia, who builds custom business systems, web
> and mobile apps, and AI features for businesses. Currently a software developer at Loranet Technologies PLT in
> Malaysia and the founder of Berkala Digital, a creative digital agency started in Palembang in 2025. Works with
> clients in Palembang, across Indonesia and remotely, in Indonesian and English.

**Headline pendek** (untuk kolom judul profil)

- ID: Software engineer di Palembang untuk sistem informasi, aplikasi web dan mobile, serta AI
- EN: Software engineer in Palembang building business systems, web and mobile apps, and AI features

## 4. Rutinitas

**Setiap ada perubahan konten**
- [ ] Perbarui tanggal `updated` di konten yang diubah (layanan, studi kasus, atau artikel).
- [ ] Deploy, lalu jalankan `npm run indexnow`.

**Artikel baru**
- Tulis di `content/articles/id/<slug>.md` dan `content/articles/en/<slug>.md` dengan `key` yang sama dan `draft: true`.
- Pratinjau dengan `SHOW_DRAFTS=1 npm run build && SHOW_DRAFTS=1 npm start`. Draf tampil bertanda "Draf" dan tidak
  diindeks.
- Setelah disetujui, ubah ke `draft: false`, build, deploy, jalankan IndexNow.
- Ide berikutnya dari peta kata kunci:
  - Berapa lama membuat aplikasi custom, dan apa yang membuatnya lebih cepat
  - Absensi pengenalan wajah, kapan layak dipakai dan kapan tidak
  - Memindahkan data Excel ke sistem tanpa kehilangan data
  - Cara memilih developer aplikasi untuk usaha
  - Hiring a Laravel developer in Indonesia, what to check (untuk klien global)

**4–8 minggu setelah live**
- [ ] Search Console, menu *Performance*. Catat kueri yang benar-benar mendatangkan tayangan dan klik, lalu sesuaikan
      judul atau buat artikel untuk kueri yang hampir masuk halaman pertama.
- [ ] Analitik kunjungan (belum terpasang di Netlify, bisa pakai Cloudflare Web Analytics yang gratis), lihat
      *Referrers*. Kunjungan dari chatgpt.com, perplexity.ai, gemini.google.com, atau claude.ai menandakan situs mulai
      dikutip AI.
- [ ] Uji langsung di ChatGPT, Gemini, Claude, dan Perplexity dengan pertanyaan seperti berikut, lalu catat apakah
      situsmu disebut.
  - "jasa pembuatan aplikasi di Palembang"
  - "developer yang bisa membuat sistem penggajian karyawan outsourcing"
  - "berapa biaya membuat aplikasi custom untuk perusahaan"
  - "hire a Laravel developer in Indonesia for a custom business system"

## Peta kata kunci

| Kelompok | Halaman | Kata kunci utama |
|---|---|---|
| Nama | Beranda | Faiz Aflah Hafizuddin, software engineer Palembang |
| Sistem custom | `/layanan/sistem-informasi-custom` | jasa pembuatan sistem informasi |
| Web & mobile | `/layanan/aplikasi-web-mobile` | jasa pembuatan aplikasi web dan mobile |
| AI & otomasi | `/layanan/aplikasi-ai-otomasi` | jasa pembuatan aplikasi AI |
| Perbaikan | `/layanan/perbaikan-pengembangan-aplikasi` | jasa perbaikan dan pengembangan aplikasi |
| Lokal | `/jasa-pembuatan-aplikasi-palembang` | jasa pembuatan aplikasi Palembang |
| Vertikal | studi kasus | aplikasi penggajian outsourcing, absensi pengenalan wajah, sistem pengadaan barang |
| Informasi & biaya | artikel + `/tanya-jawab` | biaya pembuatan aplikasi custom, kapan Excel perlu diganti sistem |
| Global | `/en/...` | custom business software developer, hire Laravel developer Indonesia |

Volume pencarian sebenarnya baru bisa dilihat di Search Console setelah situs live. Pakai data itu untuk memperbarui
tabel ini.
