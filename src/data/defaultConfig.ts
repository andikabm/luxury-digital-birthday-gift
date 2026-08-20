import { GiftConfig } from '../types';

export const defaultConfig: GiftConfig = {
  recipientName: 'Clarissa Eleanor',
  senderName: 'Someone Who Loves You',

  greetingTitle: 'Happy Birthday',

  greetingSubtitle:
    'Untuk seseorang yang sangat spesial. Semoga hari ulang tahunmu dipenuhi kebahagiaan, cinta, dan segala hal indah yang kamu impikan.',

  nextBirthdayDate: '2027-08-01T00:00:00',

  letterTitle: 'A Letter For You',

  letterBody: `Happy Birthday, Sayang...

Selamat ulang tahun untuk seseorang yang begitu berarti dalam hidupku.

Terima kasih sudah hadir dan menjadi bagian dari hari-hariku.

Mungkin hadiah ini sederhana, tetapi setiap foto, setiap lagu, dan setiap kata di dalam website ini dipersiapkan khusus untukmu.

Aku bersyukur bisa mengenalmu, berbagi cerita denganmu, dan menciptakan begitu banyak kenangan indah bersamamu.

Di hari spesialmu ini, aku berharap kamu selalu diberikan kesehatan, kebahagiaan, dan segala hal baik yang kamu impikan.

Semoga di usia yang baru ini, semakin banyak hal indah yang datang ke dalam hidupmu.

Dan semoga aku masih bisa menjadi seseorang yang menemanimu dalam banyak cerita dan perjalanan berikutnya.

Selamat ulang tahun, Sayang.

I love you,
today,
tomorrow,
and forever.`,

  closingQuote: 'Forever starts with you. ❤️',

  videoUrl: '/videos/ourstory.mp4',

  videoPoster: '/images/photo7.jpg',

  bgMusicPreset: 'romantic-piano',

  photos: [
    {
      id: 'p1',
      url: '/images/photo1.jpg',
      title: 'The Beginning',
      caption: 'Semua cerita indah kita dimulai dari sini.',
      date: 'Our Story',
      aspectRatio: 'portrait'
    },
    {
      id: 'p2',
      url: '/images/photo2.jpg',
      title: 'Every Smile',
      caption: 'Senyummu selalu menjadi alasan bahagiaku.',
      date: 'Beautiful Memory',
      aspectRatio: 'portrait'
    },
    {
      id: 'p3',
      url: '/images/photo3.jpg',
      title: 'You & Me',
      caption: 'Rumahku selalu ada di sampingmu.',
      date: 'Together',
      aspectRatio: 'portrait'
    },
    {
      id: 'p4',
      url: '/images/photo4.jpg',
      title: 'Little Moments',
      caption: 'Kebahagiaan selalu terasa sederhana saat bersamamu.',
      date: 'Our Love',
      aspectRatio: 'portrait'
    },
    {
      id: 'p5',
      url: '/images/photo5.jpg',
      title: 'Always',
      caption: 'Aku akan terus memilihmu, setiap hari.',
      date: 'Forever',
      aspectRatio: 'portrait'
    },
    {
      id: 'p6',
      url: '/images/photo6.jpg',
      title: 'Happy Birthday',
      caption: 'Semoga hari spesialmu dipenuhi kebahagiaan dan cinta.',
      date: 'Your Special Day',
      aspectRatio: 'portrait'
    }
  ]
};