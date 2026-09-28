---
key: "tiered-approval"
title: "Persetujuan berjenjang yang tidak bikin macet"
metaTitle: "Alur Persetujuan Berjenjang yang Tidak Macet"
description: "Cara merancang alur persetujuan berjenjang di aplikasi supaya revisi tidak mengulang dari awal, tanggung jawab selalu jelas, dan setiap keputusan tercatat."
summary: "Persetujuan berjenjang macet ketika revisi mengulang dari awal, tidak jelas siapa yang sedang memegang pekerjaan, dan keputusan tidak disertai alasan. Alur yang lancar mengembalikan revisi hanya ke pemeriksa yang memintanya, memindahkan tanggung jawab setelah penerima setuju, dan mencatat setiap keputusan beserta alasannya."
published: 2026-09-28
updated: 2026-09-28
services: ["systems", "fix"]
work: ["shareholder-directives", "task-handover", "service-requests"]
draft: false
---

## Kenapa persetujuan berjenjang sering macet

Persetujuan berjenjang ada untuk alasan yang baik, yaitu supaya pekerjaan penting diperiksa oleh orang yang tepat. Masalahnya, alur yang dipindahkan begitu saja dari kertas ke aplikasi sering ikut membawa kebiasaan yang memperlambat. Tiga penyebab yang paling sering muncul adalah

1. revisi yang mengulang dari tahap pertama,
2. tidak jelas siapa yang sedang memegang pekerjaan,
3. keputusan tanpa alasan, sehingga pengaju harus menebak apa yang salah.

## Revisi kembali ke pemeriksa yang memintanya

Saya pernah membangun sistem tindak lanjut arahan rapat pemegang saham untuk sebuah BUMN. Setiap laporan tindak lanjut melewati tujuh tahap pemeriksaan sesuai jabatan. Kalau setiap revisi harus mengulang dari tahap pertama, satu laporan bisa berputar lama tanpa kemajuan.

Karena itu, permintaan revisi tidak mengulang dari awal. Laporan yang sudah diperbaiki kembali langsung ke pemeriksa yang meminta revisi, lalu melanjutkan ke tahap berikutnya. Pemeriksa sebelumnya tidak perlu memeriksa ulang bagian yang sudah mereka setujui.

## Tanggung jawab berpindah setelah diterima

Di aplikasi serah-terima tugas tim, pertanyaan utamanya adalah siapa yang sedang memegang setiap tugas. Serah-terima dibuat sebagai permintaan, bukan pemindahan langsung. Tanggung jawab baru berpindah setelah penerima menyetujui, dan penolakan wajib disertai alasan. Dengan begitu tidak ada tugas yang dilempar lalu tidak dipegang siapa pun.

## Setiap keputusan disertai catatan

Persetujuan tanpa catatan memang cepat diberikan, tapi merepotkan kemudian. Pengaju tidak tahu apa yang harus diperbaiki, dan beberapa bulan kemudian tidak ada yang ingat alasannya. Di kedua sistem tadi, setiap keputusan wajib disertai catatan dan setiap langkah tercatat di riwayat. Riwayat ini juga menjawab pertanyaan pemeriksa atau auditor tanpa harus mencari di grup chat.

## Periksa bagian yang salah saja

Di sistem pengajuan layanan, setiap jenis layanan punya syarat berkas yang berbeda. Berkas diperiksa satu per satu, bukan per pengajuan. Kalau satu berkas ditolak, pemohon cukup mengunggah ulang berkas itu saja, bukan seluruh pengajuan.

Prinsip yang sama berlaku untuk persetujuan apa pun. Semakin kecil bagian yang harus diulang, semakin cepat alurnya berjalan.

## Daftar periksa sebelum membangun alur persetujuan

- Siapa saja pemeriksanya, dan apakah urutannya mengikuti jabatan atau jenis pekerjaan?
- Ke mana pekerjaan kembali saat diminta revisi?
- Kapan tepatnya tanggung jawab berpindah dari satu orang ke orang lain?
- Apakah setiap keputusan wajib disertai alasan?
- Siapa saja yang boleh melihat riwayatnya?
- Apa yang terjadi kalau pemeriksa sedang tidak ada?

Kalau alur persetujuan di tempatmu sering macet, ceritakan urutannya. Titik macetnya biasanya sudah terlihat dari cara revisi dan serah-terima ditangani.
