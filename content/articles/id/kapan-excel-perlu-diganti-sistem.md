---
key: "replace-spreadsheets"
title: "Kapan Excel dan grup chat perlu diganti sistem"
metaTitle: "Kapan Excel dan Grup Chat Perlu Diganti Sistem"
description: "Tanda pekerjaan harian sudah terlalu besar untuk Excel dan grup chat, contoh dari penggajian dan pengadaan barang, serta kapan Excel justru masih cukup."
summary: "Excel dan grup chat cukup selama datanya kecil, pemakainya sedikit, dan kesalahan mudah terlihat. Saatnya beralih ke sistem ketika data yang sama diketik berulang kali, angka tidak bisa ditelusuri asalnya, persetujuan hilang di tengah percakapan, atau hanya satu orang yang paham cara file itu bekerja."
published: 2026-09-28
updated: 2026-09-28
services: ["systems", "fix"]
work: ["sipeg", "procurement"]
draft: false
---

## Excel bukan musuh

Excel adalah alat yang sangat baik. Banyak usaha berjalan bertahun-tahun dengan satu file rekap dan satu grup chat. Masalahnya muncul pelan-pelan, ketika jumlah orang, data, dan aturan bertambah sementara alatnya tetap sama. Tulisan ini membantu kamu menilai apakah titik itu sudah lewat.

## Enam tanda sudah waktunya beralih

### Data yang sama diketik lebih dari sekali

Permintaan dicatat di chat, disalin ke Excel, lalu diketik lagi di laporan. Setiap salinan adalah kesempatan untuk salah ketik, dan tidak ada yang tahu salinan mana yang benar.

### Angka tidak bisa ditelusuri asalnya

Total di akhir bulan berbeda dari perkiraan, dan butuh berjam-jam untuk mencari penyebabnya. Rumus yang tertimpa, baris yang terhapus, atau sel yang berisi #REF! tidak meninggalkan jejak.

### Persetujuan hilang di tengah percakapan

"Sudah di-acc belum?" menjadi pertanyaan harian. Persetujuan yang diberikan lewat chat sulit dicari lagi, apalagi kalau orang yang menyetujui sedang cuti atau sudah pindah bagian.

### File terakhir tidak jelas

Ada rekap FINAL, rekap FINAL (2), dan rekap FINAL revisi. Dua orang mengubah file yang berbeda di hari yang sama, lalu salah satunya harus dikerjakan ulang.

### Hanya satu orang yang paham

Hanya satu orang yang tahu rumus dan urutan kerjanya. Ketika orang itu sakit atau keluar, pekerjaan ikut berhenti.

### Kesalahan baru ketahuan setelah terlambat

Stok ternyata habis saat barangnya dibutuhkan. Gaji ternyata kurang setelah slip dibagikan. Kesalahan yang terlambat ketahuan selalu lebih mahal daripada kesalahan yang tertangkap saat data dimasukkan.

## Contoh dari proyek nyata

### Penggajian karyawan outsourcing

Perusahaan yang menempatkan karyawannya di banyak klien harus menghitung gaji dengan aturan yang berbeda di tiap kontrak. Tanggal gajiannya berbeda, karyawan bisa mulai di tengah periode, potongan BPJS berbeda per jabatan, dan kasbon dicicil dari gaji. Di spreadsheet, setiap aturan menjadi rumus yang harus dijaga secara manual. Di sistem yang saya bangun, setiap baris gaji menunjukkan gaji pokok, hari aktif, potongan BPJS, dan kasbon yang memotongnya, sehingga admin bisa memeriksa totalnya baris per baris.

### Permintaan dan pengadaan barang

Unit kerja meminta barang, gudang mencatat stok, dan bagian pengadaan membeli ke vendor. Kalau ketiganya memakai catatan terpisah, permintaan bisa disetujui padahal barangnya tidak ada. Di sistemnya, permintaan mendesak langsung dicek ke stok. Kalau stoknya kurang, sistem membuat pengadaan hanya sebesar kekurangannya. Saat barang datang, permintaan yang menunggu selesai dengan sendirinya.

## Kapan Excel masih cukup

Tidak semua pekerjaan butuh sistem. Excel masih pilihan yang tepat kalau

- datanya hanya dipakai satu atau dua orang,
- aturannya sederhana dan jarang berubah,
- tidak ada persetujuan berjenjang,
- kesalahan kecil mudah terlihat dan murah diperbaiki.

Membangun sistem untuk pekerjaan seperti ini justru menambah biaya tanpa manfaat yang sepadan.

## Langkah pertama yang aman

Kamu tidak perlu mengganti semuanya sekaligus. Pilih satu alur yang paling sering salah atau paling lambat, lalu pindahkan alur itu dulu. Perubahan dipasang bertahap supaya pekerjaan sehari-hari tetap berjalan, dan data lama dipindahkan dengan hati-hati supaya tidak ada yang hilang.
