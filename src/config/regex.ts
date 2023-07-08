import { Data } from '../utils/types.js';

/**
 * List of words that indicates the first word of `description` and where the words for `name` ends.
 *
 * For example:
 *
 * string: "Jonny Age: 19"
 * divider word: "Age"
 *
 * Result: {name: "Jonny", description: "Age: 19"}
 */
export const nameDescDividerWords = [
  'amar',
  'adalah',
  'data',
  'desa',
  'berdasarkan',
  'bergabung',
  'berubah',
  'cakupan',
  'duplikasi',
  'duplikat',
  'DS',
  'DITJEN',
  'diperbarui',
  'EMEKARAN',
  'hasil',
  'kec',
  'kel',
  'kepbup',
  'keputusan',
  'klarifikasi',
  'koreksi',
  'lampiran',
  'letak',
  'menjadi',
  'nagari',
  'nama',
  'nd rekom',
  'PEMAKARAN',
  'pembentukan',
  'PEMEAKRAN',
  'PEMEBNTUKAN',
  'PEMEKAAN',
  'PEMEKRAN',
  'pemekaran',
  'PEMEKERAN',
  'PENGABUNGAN',
  'pengangkatan',
  'PENGKATAN',
  'penggabungan',
  'penghapusan',
  'PENGHPUSAN',
  'peningkatan',
  'penyampaian',
  'penyerahan',
  'peraturan',
  'perbaikan',
  'perbup',
  'perda',
  'PERMEKARAN',
  'perub',
  'perubahan',
  'pmd',
  'PMKRAN',
  'PMKRN',
  'penataan',
  'pindah',
  'PRBHAN',
  'pp',
  'PTSAN',
  'putusan',
  'qanun',
  'rancangan',
  'rekomendasi',
  'sebelum',
  'sebelumnya',
  'semua',
  'SEMUAL',
  'SEMUILA',
  'SEMUKA',
  'semula',
  'SEMULAWIL',
  'sesuai',
  'sk',
  'SMLA',
  'SMULA',
  'srt',
  'SSEMULA',
  'surat',
  'tentang',
  'ttg',
  'undang',
  'uu',
  'wil',
  'wilayah',
];

export const forceDividerWords = [
  'PMD',
];

export const excludeWords = (data: Data) => {
  switch (data) {
    case 'districts':
      return [
        'desa',
        'nagari',
      ];

    default:
      return [];
  }
};
