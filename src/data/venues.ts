import { Venue } from '../types';

// Initial seed data (sample). In real scenario could be extended or fetched.
export const venues: Venue[] = [
  // New real local venues (basic extracted info, hours approximated; refine with exact weekly schedule later)
  {
    id: 'pizza-palma',
    name: 'Pizza Palma',
    type: 'restaurant',
    address: 'Reštaurácia PALMA, Za Vodou 1387/3, Stará Ľubovňa, 064 01',
    weeklyHours: {
      mon: { open: '10:00', close: '22:00' },
      tue: { open: '10:00', close: '22:00' },
      wed: { open: '10:00', close: '22:00' },
      thu: { open: '10:00', close: '22:00' },
      fri: { open: '10:00', close: '24:00' },
      sat: { open: '11:00', close: '24:00' },
      sun: { open: '11:00', close: '22:00' }
    },
    website: 'https://pizzapalma.sk/',
    facebook: 'https://www.facebook.com/RestauraciaPalma/?locale=sk_SK',
    instagram: 'https://www.instagram.com/palma.restauracia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    image: 'https://pizzapalma.sk/wp-content/uploads/MG_6577_AuroraHDR-edit.jpg'
  },
  {
    id: 'pizzeria-dafofo',
    name: 'Pizzeria Da Fofo',
    type: 'restaurant',
    address: 'Levočská 3, 064 01 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '10:00', close: '22:00' },
      tue: { open: '10:00', close: '22:00' },
      wed: { open: '10:00', close: '22:00' },
      thu: { open: '10:00', close: '22:00' },
      fri: { open: '10:00', close: '24:00' },
      sat: { open: '13:00', close: '23:00' },
      sun: null // closed
    },
    website: 'https://www.dafofo.sk/',
    facebook: 'https://www.facebook.com/pages/Pizzeria-DA-FOFO/626924364052055',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1PoUxGHLo0F8Ixl65imsxCCwugSs-TNX04A&s'
  },
  {
    id: 'restauracia-kolkaren',
    name: 'Reštaurácia Kolkáreň',
    type: 'restaurant',
    address: 'Námestie svätého Mikuláša 12, 064 01 Stará Ľubovňa',
    weeklyHours: {
  mon: { open: '10:00', close: '22:00' },
  tue: { open: '10:00', close: '22:00' },
  wed: { open: '10:00', close: '22:00' },
  thu: { open: '10:00', close: '22:00' },
  fri: { open: '10:00', close: '24:00' },
  sat: { open: '11:00', close: '24:00' },
  sun: { open: '11:00', close: '22:00' }
    },
    weeklyKitchenHours: {
      mon: { open: '10:00', close: '21:00' },
      tue: { open: '10:00', close: '21:00' },
      wed: { open: '10:00', close: '21:00' },
      thu: { open: '10:00', close: '21:00' },
      fri: { open: '10:00', close: '22:30' },
      sat: { open: '11:00', close: '22:30' },
      sun: { open: '11:00', close: '21:00' }
    },
    website: 'https://www.restauraciakolkaren.sk/',
    facebook: 'https://www.facebook.com/restauraciakolkaren',
    instagram: 'https://www.instagram.com/kolkaren/',
    image: 'https://www.staralubovna.sk/resources/App/large/202002120907390.kolkare.jpg '
  },
  {
    id: 'pho-dem',
    name: 'PHỞ ĐÊM',
    type: 'restaurant',
    address: 'Letná 1073/6 064 03 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '10:00', close: '21:00' },
      tue: { open: '10:00', close: '21:00' },
      wed: { open: '10:00', close: '21:00' },
      thu: { open: '10:00', close: '21:00' },
      fri: { open: '10:00', close: '22:00' },
      sat: { open: '11:00', close: '22:00' },
      sun: null
    },
    website: 'https://www.phodem.sk/',
    facebook: 'https://www.facebook.com/p/Ph%E1%BB%91-%C4%91%C3%AAm-61550971261155/?locale=sk_SK',
    instagram: 'https://www.instagram.com/phodem.restaurant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    image: 'https://scontent.fksc2-1.fna.fbcdn.net/v/t39.30808-6/475419919_122236507118032375_1310630945736455483_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ifCTGhNlULwQ7kNvwEnsvSb&_nc_oc=AdkQukMCDY3ZLWHBDNhOMXlpkGmCnZkhd5IyBHZujaM0UXfv3ZKHfZvpt5lbIuRFkzM&_nc_zt=23&_nc_ht=scontent.fksc2-1.fna&_nc_gid=giJfiWd4KaULeM1OwaxIig&oh=00_AfXCN9UbQpXjziaAUeEuHx5Um42YZ8niwCB1knvtvZO-xw&oe=68A40FEC'
  },
  {
    id: 'src-kaviaren',
    name: 'ŠRC Kaviareň',
    type: 'cafe',
    address: 'Okružná 16/A, Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '14:00', close: '21:00' },
      tue: { open: '14:00', close: '21:00' },
      wed: { open: '14:00', close: '22:00' },
      thu: { open: '14:00', close: '22:00' },
      fri: { open: '14:00', close: '01:00' },
      sat: { open: '14:00', close: '01:00' },
      sun: { open: '14:00', close: '21:00' }
    },
    website: 'https://srcsl.sk/',
    facebook: 'https://www.facebook.com/sportovearelaxacnecentrum',
    instagram: 'https://www.instagram.com/src_sl/',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdynamic-media-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F12%2F47%2F79%2F9a%2Fsportove-a-relaxacne.jpg%3Fw%3D1200%26h%3D1200%26s%3D1&f=1&nofb=1&ipt=d12c4a0c66ccfbce28e28206fc847e5ca7316d9d6f865ce29f2ddcd197e66386'
  },
  {
    id: 'ecko-bar',
    name: 'EČKO Bar',
    type: 'pub',
    address: 'Tehelná 462, 064 01 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '15:00', close: '23:00' },
      tue: { open: '15:00', close: '23:00' },
      wed: { open: '15:00', close: '23:00' },
      thu: { open: '15:00', close: '23:00' },
      fri: { open: '15:00', close: '24:00' },
      sat: { open: '15:00', close: '24:00' },
      sun: { open: '15:00', close: '23:00' }
    },
    facebook: 'https://www.facebook.com/eckobarSL',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPqnu-tKN0IApGdZlrFvdZTrBJTLe1P3bpWP2l7=s1360-w1360-h1020-rw'
  },
  {
    id: 'pivaren-neptun',
    name: 'Piváreň Neptún',
    type: 'pub',
    address: 'Stará Ľubovňa', // Add complete address if available
    weeklyHours: {
      mon: { open: '17:00', close: '22:00' },
      tue: { open: '17:00', close: '22:00' },
      wed: { open: '17:00', close: '22:00' },
      thu: { open: '17:00', close: '22:00' },
      fri: { open: '15:00', close: '00:00' },
      sat: { open: '15:00', close: '00:00' },
      sun: { open: '15:00', close: '22:00' }
    },
    // Add website, facebook, instagram if available
    image: 'https://lh3.googleusercontent.com/p/AF1QipM2yaOTKQcU-L8G7E0wg012yvs50vIQrYWj1MCe=s1360-w1360-h1020-rw', // Add image URL when available
    website: 'https://pivarenneptun.sk/',
    facebook: 'https://www.facebook.com/pivarenneptun/',
    instagram: 'https://www.instagram.com/pivarenneptun/'
  },
  {
    id: 'restauracia-shang-hai',
    name: 'Reštaurácia Shang Hai',
    type: 'restaurant',
    address: 'Levočská, 064 01 Stará Ľubovňa, Slovakia',
    weeklyHours: {
      mon: { open: '10:00', close: '22:00' },
      tue: { open: '10:00', close: '22:00' },
      wed: { open: '10:00', close: '22:00' },
      thu: { open: '10:00', close: '22:00' },
      fri: { open: '10:00', close: '23:00' },
      sat: { open: '11:00', close: '23:00' },
      sun: { open: '11:00', close: '22:00' }
    },
    image: 'https://ockocka.sk/wp-content/uploads/2018/05/logo-cinska-restauracia.png' // Replace with actual image URL when available
  },
  {
    id: 'motorest-salas-u-franka',
    name: 'Motorest Salaš u Franka',
    type: 'restaurant',
    address: 'Popradská 682, 064 01 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '08:30', close: '22:00' },
      tue: { open: '08:30', close: '22:00' },
      wed: { open: '08:30', close: '22:00' },
      thu: { open: '08:30', close: '22:00' },
      fri: { open: '08:30', close: '23:00' },
      sat: { open: '09:00', close: '23:00' },
      sun: { open: '09:00', close: '22:00' }
    },
    image: 'https://visitspis.sk/wp-content/uploads/2020/10/jan_6300-scaled.jpg'
  },
  {
    id: 'kebabing',
    name: 'Kebabing',
    type: 'restaurant',
    address: 'Nám. Sv. Mikuláša 18A, Stará Ľubovňa, Slovakia',
    weeklyHours: {
      mon: { open: '10:00', close: '22:00' },
      tue: { open: '10:00', close: '22:00' },
      wed: { open: '10:00', close: '22:00' },
      thu: { open: '10:00', close: '22:00' },
      fri: { open: '10:00', close: '02:00' },
      sat: { open: '15:00', close: '02:00' },
      sun: { open: '15:00', close: '21:00' }
    },
    image: 'https://www.staralubovna.sk/resources/App/large/202002120942390.kebabing.jpg',
    facebook: 'https://www.facebook.com/p/Kebabing-100057348824620/?locale=sk_SK',
  },
  {
    id: 'damask-kebab',
    name: 'Damask Kebab',
    type: 'restaurant',
    address: 'Obchodná 1110, 064 01 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '11:00', close: '24:00' },
      tue: { open: '11:00', close: '24:00' },
      wed: { open: '11:00', close: '24:00' },
      thu: { open: '11:00', close: '24:00' },
      fri: { open: '11:00', close: '02:00' },
      sat: { open: '11:00', close: '02:00' },
      sun: null
    },
    image: 'https://www.staralubovna.sk/resources/App/large/202002120950540.damask-kebab.jpg'
  },
  {
    id: 'chaluj-burger-beer',
    name: 'Chaluj Burger & Beer',
    type: 'restaurant',
    address: 'Obchodná 1110/3, 064 01 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '12:00', close: '22:00' },
      tue: { open: '12:00', close: '22:00' },
      wed: { open: '12:00', close: '22:00' },
      thu: { open: '12:00', close: '22:00' },
      fri: { open: '12:00', close: '22:00' },
      sat: { open: '15:00', close: '00:00' },
      sun: null
    },
    image: 'https://scontent.fksc2-1.fna.fbcdn.net/v/t39.30808-6/482191312_942962238032035_3132695990819055155_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=75IZEVbNovEQ7kNvwEubqgB&_nc_oc=Adk3IfAzGGEtDTB3AkNWbaMURUZTwVJ8s6ZSdMwnH8niWYOdtuFPB-xmXo63iqClFyM&_nc_zt=23&_nc_ht=scontent.fksc2-1.fna&_nc_gid=tGqx9IEAg94MKKtw3yXvJg&oh=00_AfWPXAgtOjDJZJGn75YZsGiQ316zyJ8jSd2T9jVnoBLYhQ&oe=68A4AF2E'
  }
];
