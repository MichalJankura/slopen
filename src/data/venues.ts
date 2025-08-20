import { Venue } from '../types';

// Initial seed data (sample). In real scenario could be extended or fetched.
export const venues: Venue[] = [
  // New real local venues (basic extracted info, hours approximated; refine with exact weekly schedule later)
    //PALMA
  {
    id: 'pizza-palma',
    name: 'Pizza Palma',
    types: ['restaurant'],
    address: 'Reštaurácia PALMA, Za Vodou 1387/3, Stará Ľubovňa, 064 01',
  rating: 4.5,
  ratingCount: 883,
    reviews: '4*', // Example review rating
    restaurantType: 'normal',
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
    image: 'https://pizzapalma.sk/wp-content/uploads/MG_6577_AuroraHDR-edit.jpg',
    menu: 'https://pizzapalma.sk/wp-content/uploads/letne-menu-2025.pdf',
    dailyMenu: 'https://pizzapalma.sk/wp-content/uploads/menu.pdf'
  },
  // Pizzeria Da Fofo
  {
    id: 'pizzeria-dafofo',
    name: 'Pizzeria Da Fofo',
    types: ['restaurant'],
    address: 'Levočská 3, 064 01 Stará Ľubovňa',
  rating: 4.5,
  ratingCount: 168,
    restaurantType: 'normal',
    weeklyHours: {
      mon: { open: '10:00', close: '22:00' },
      tue: { open: '10:00', close: '22:00' },
      wed: { open: '10:00', close: '22:00' },
      thu: { open: '10:00', close: '22:00' },
      fri: { open: '10:00', close: '24:00' },
      sat: { open: '13:00', close: '23:00' },
      // closed
    },
    website: 'https://www.dafofo.sk/',
    facebook: 'https://www.facebook.com/pages/Pizzeria-DA-FOFO/626924364052055',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1PoUxGHLo0F8Ixl65imsxCCwugSs-TNX04A&s',
    menu: 'https://www.dafofo.sk/#pizza',
  },
  // Reštaurácia Kolkáreň
  {
    id: 'restauracia-kolkaren',
    name: 'Reštaurácia Kolkáreň',
    types: ['restaurant'],
    address: 'Námestie svätého Mikuláša 12, 064 01 Stará Ľubovňa',
  rating: 4.1,
  ratingCount: 1105,
    restaurantType: 'tradičná',
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
    image: 'https://www.staralubovna.sk/resources/App/large/202002120907390.kolkare.jpg ',
    menu: 'https://www.restauraciakolkaren.sk/jedalny-listok/#dearflip-df_1041/1/',
    dailyMenu: 'https://www.restauraciakolkaren.sk/denne-menu/'
  },
  // PHỞ ĐÊM Stará Ľubovňa
  {
    id: 'pho-dem',
    name: 'PHỞ ĐÊM Stará Ľubovňa',
    types: ['restaurant'],
    address: 'Letná 1073/6 064 03 Stará Ľubovňa',
  rating: 4.1,
  ratingCount: 122,
    restaurantType: 'ázijská',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6K-J6Rw0h0B-nNheGM1rnKzZP7orTVg9_LQ&s',
    menu: '/menus/phodem_menu.pdf',
    dailyMenu: 'https://www.facebook.com/p/Ph%E1%BB%91-%C4%91%C3%AAm-61550971261155/?locale=sk_SK'
  },
  // ŠRC Kaviareň
  {
    id: 'src-kaviaren',
    name: 'ŠRC Kaviareň',
    types: ['cafe'],
    address: 'Okružná 16/A, Stará Ľubovňa',
  rating: 4.3,
  ratingCount: 303,
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
  // EČKO Bar
  {
    id: 'ecko-bar',
    name: 'EČKO Bar',
    types: ['pub'],
    address: 'Tehelná 462, 064 01 Stará Ľubovňa',
  rating: 4.6,
  ratingCount: 92,
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
  // Piváreň Neptún
  {
    id: 'pivaren-neptun',
    name: 'Piváreň Neptún',
    types: ['pub'],
    address: 'Mierová 1098/62, 064 01 Stará Ľubovňa', // Add complete address if available
  rating: 4.7,
  ratingCount: 172,
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
    instagram: 'https://www.instagram.com/pivarenneptun/',
    menu: 'https://pivarenneptun.sk/jedalny-listok/',
  },
  // Reštaurácia Shang Hai
  {
    id: 'restauracia-shang-hai',
    name: 'Reštaurácia Shang Hai',
    types: ['restaurant'],
    address: 'Levočská, 064 01 Stará Ľubovňa, Slovakia',
  rating: 4.3,
  ratingCount: 317,
    restaurantType: 'ázijská',
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
  // Motorest Salaš u Franka
  {
    id: 'motorest-salas-u-franka',
    name: 'Motorest Salaš u Franka',
    types: ['restaurant'],
    address: 'Popradská 682, 064 01 Stará Ľubovňa',
  rating: 4.6,
  ratingCount: 6019,
    restaurantType: 'tradičná',
    weeklyHours: {
      mon: { open: '08:30', close: '22:00' },
      tue: { open: '08:30', close: '22:00' },
      wed: { open: '08:30', close: '22:00' },
      thu: { open: '08:30', close: '22:00' },
      fri: { open: '08:30', close: '23:00' },
      sat: { open: '09:00', close: '23:00' },
      sun: { open: '09:00', close: '22:00' }
    },
    image: 'https://visitspis.sk/wp-content/uploads/2020/10/jan_6300-scaled.jpg',
    website: 'https://www.salasufranka.sk/',
    facebook: 'https://www.facebook.com/salasufranka/?locale=sk_SK',
    menu: 'https://www.salasufranka.sk/resources/File/36f12306-82c3-4e89-ae7f-c1ffa2161506.pdf',
    dailyMenu: 'https://www.salasufranka.sk/denne-menu/'

  },
  // Kebabing
  {
    id: 'kebabing',
    name: 'Kebabing',
    types: ['restaurant'],
    address: 'Nám. Sv. Mikuláša 18A, Stará Ľubovňa, Slovakia',
  rating: 4.5,
  ratingCount: 344,
    restaurantType: 'normal',
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
    menu: 'https://scontent.fksc2-1.fna.fbcdn.net/v/t1.6435-9/99257492_3028191690573829_1234728408118722560_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=WUeCxfh3HQYQ7kNvwFYbcHm&_nc_oc=AdkDtwGOQLy2pSutDYApNgkTHNg4ZrKPHCJsxNoIY0sfa6h2zGagiqAdUyI6YlcBDps&_nc_zt=23&_nc_ht=scontent.fksc2-1.fna&_nc_gid=XOtwc9aAnyqExfnsRFEgCA&oh=00_AfVPAErmxTzrIKvvf9RZSY9nbcWPnpoEG-KEwexQyP2zxw&oe=68CC13EB'
  },
  // Damask Kebab
  {
    id: 'damask-kebab',
    name: 'Damask Kebab',
    types: ['restaurant'],
    address: 'Obchodná 1110, 064 01 Stará Ľubovňa',
  rating: 4.6,
  ratingCount: 135,
    restaurantType: 'normal',
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
  // Chaluj Burger & Beer
  {
    id: 'chaluj-burger-beer',
    name: 'Chaluj Burger & Beer',
    types: ['restaurant'],
    address: 'Obchodná 1110/3, 064 01 Stará Ľubovňa',
  rating: 4.7,
  ratingCount: 294,
    restaurantType: 'normal',
    weeklyHours: {
      mon: { open: '12:00', close: '22:00' },
      tue: { open: '12:00', close: '22:00' },
      wed: { open: '12:00', close: '22:00' },
      thu: { open: '12:00', close: '22:00' },
      fri: { open: '12:00', close: '22:00' },
      sat: { open: '15:00', close: '00:00' },
      sun: null
    },
    image: 'https://th.bing.com/th/id/OLC.VI8BQCTOupIryg480x360?&rs=1&pid=ImgDetMain&o=7&rm=3',
    facebook: 'https://www.facebook.com/Chalujburgerbeer/?locale=sk_SK',
    menu: '/menus/chaluj-burger-beer_menu.pdf'
  },
  // SOŠKA - coffee-market-beauty
  {
    id: 'soska-coffee-market-beauty',
    name: 'SOŠKA - coffee-market-beauty',
    types: ['cafe'],
    address: 'Námestie svätého Mikuláša 24/24, 064 01 Stará Ľubovňa',
    menu: '/menus/soska_menu.pdf',
  rating: 4.9,
  ratingCount: 61,
    weeklyHours: {
      mon: { open: '09:00', close: '18:00' },
      tue: { open: '09:00', close: '18:00' },
      wed: { open: '09:00', close: '18:00' },
      thu: { open: '09:00', close: '18:00' },
      fri: { open: '09:00', close: '19:00' },
      sat: { open: '13:30', close: '19:00' },
      sun: { open: '13:30', close: '19:00' }
    },
    facebook: 'https://www.facebook.com/p/soskasl-100091129954884/',
    instagram: 'https://www.instagram.com/soska.sl/',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPpINkUWV-Q6SloFVfG45xW-NhQYBrGgOGvdMts=s1360-w1360-h1020-rw'
  },
  // Castle DISTILLERY
  {
    id: 'castle-distillery',
    name: 'Castle DISTILLERY',
    types: ['pub'],
    address: 'Zámocká 766, 064 01 Stará Ľubovňa', // Add full address if available
  rating: 4.3,
  ratingCount: 154,
    weeklyHours: {
      mon: { open: '10:00', close: '21:00' },
      tue: { open: '10:00', close: '21:00' },
      wed: { open: '10:00', close: '21:00' },
      thu: { open: '10:00', close: '21:00' },
      fri: { open: '10:00', close: '21:00' },
      sat: { open: '10:00', close: '21:00' },
      sun: { open: '10:00', close: '21:00' }
    },
    website: 'https://www.castledistillery.sk/',
    facebook: 'https://www.facebook.com/castledistillery/',
    instagram: 'https://www.instagram.com/castle_distillery/',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/480527341.jpg?k=d3a2c528dcc123d0d6d366bae639a753ecad8cbdecda9092e0f1b67df3cd50af&o=&hp=1',
    menu: 'https://www.castledistillery.sk/assets/public/menu_castle_distillery.pdf'
  },
  // U Jeleňa
  {
    id: 'u-jelena',
    name: 'U Jeleňa',
    types: ['restaurant', 'pub'],
    address: 'Námestie svätého Mikuláša 22, 064 01 Stará Ľubovňa',
  rating: 4.2,
  ratingCount: 204,
    weeklyHours: {
      mon: { open: '07:00', close: '20:00' },
      tue: { open: '07:00', close: '20:00' },
      wed: { open: '07:00', close: '20:00' },
      thu: { open: '07:00', close: '20:00' },
      fri: { open: '07:00', close: '20:00' },
      sat: { open: '08:00', close: '19:00' },
      sun: { open: '08:00', close: '19:00' }
    },
    website: 'http://www.ujelena.sk/index1.html',
    facebook: 'https://www.facebook.com/ujelena.sk/',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4no4etyNBc4LyZjtWsyrDt2gobuVtC-niT-LtTRYkqg44qoqZSZ-irAInLxTNsxJXsvupYJ-hdjmVA3opKqDSkCtaTFRPtz7ykVm4Lx-4-16oPzFaFNZrFYcIv9Z3Eic2qpmaBzyYw=s680-w680-h510-rw',
    menu: 'http://www.ujelena.sk/index1.html',
    dailyMenu: 'http://www.ujelena.sk/index2.html'
  },
  // Reštaurácia Panorama
  {
    id: 'panorama',
    name: 'Reštaurácia Panorama',
    types: ['restaurant'],
    address: 'Popradská 1523/10, 064 01 Stará Ľubovňa',
  rating: 4.3,
  ratingCount: 502,
    restaurantType: 'normal',
    weeklyHours: {
      mon: { open: '10:30', close: '14:30' },
      tue: { open: '10:30', close: '14:30' },
      wed: { open: '10:30', close: '14:30' },
      thu: { open: '10:30', close: '14:30' },
      fri: { open: '10:30', close: '14:30' },
      sat: null,
      sun: null
    },
    website: 'https://palmagastro.sk/',
    image: 'https://palmagastro.sk/wp-content/uploads/2016/02/IMG_7848-1.jpg',
    dailyMenu: 'https://palmagastro.sk/wp-content/uploads/2016/02/menu.pdf'
  },
  // Cukráreň Marianna
  {
    id: 'cukraren-marianna',
    name: 'Cukráreň Marianna',
    types: ['cafe'],
    address: 'Námestie generála Štefánika 3, 064 01 Stará Ľubovňa',
  rating: 4.3,
  ratingCount: 24,
    weeklyHours: {
      mon: { open: '08:00', close: '18:00' },
      tue: { open: '08:00', close: '18:00' },
      wed: { open: '08:00', close: '18:00' },
      thu: { open: '08:00', close: '18:00' },
      fri: { open: '08:00', close: '18:00' },
      sat: { open: '10:00', close: '18:00' },
      sun: { open: '11:00', close: '19:00' }
    },
    website: 'https://mariannanova.sk/',
    facebook: 'https://www.facebook.com/mariannanovasro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG3yejoLxSVeRmXVwEnwJei-RlP4aicJ-aJQ&s',
    menu: 'https://mariannanova.sk/cukraren-ponuka',
  },
  // Pekáreň Marianna
  {
    id: 'pekaren-marianna',
    name: 'Pekáreň Marianna',
    types: ['bakery'],
    address: 'Námestie generála Štefánika 3, 064 01 Stará Ľubovňa',
  // rating intentionally omitted (shared brand)
    weeklyHours: {
      mon: { open: '07:00', close: '17:30' },
      tue: { open: '07:00', close: '17:30' },
      wed: { open: '07:00', close: '17:30' },
      thu: { open: '07:00', close: '17:30' },
      fri: { open: '07:00', close: '17:30' },
      sat: null,
      sun: null
    },
    website: 'https://mariannanova.sk/',
    facebook: 'https://www.facebook.com/mariannanovasro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG3yejoLxSVeRmXVwEnwJei-RlP4aicJ-aJQ&s',
    dailyMenu: 'https://mariannanova.sk/ponuka',
  },
  // Damask Kebab Družba
  {
    id: 'damask-kebab-druzba',
    name: 'Damask Kebab Družba',
    types: ['restaurant'],
    address: 'Stará Ľubovňa 064 01, 064 01 Stará Ľubovňa',
  // rating not provided in list
    weeklyHours: {
      mon: { open: '10:00', close: '22:00' },
      tue: { open: '10:00', close: '22:00' },
      wed: { open: '10:00', close: '22:00' },
      thu: { open: '10:00', close: '22:00' },
      fri: { open: '10:00', close: '22:00' },
      sat: { open: '10:00', close: '22:00' },
      sun: null
    },
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noQ92TKmovotZUu2fa-RwLbF4QVxRmTFwBFgQ4uGHRONFGFh72toNWkWTchiFi1zH82QX49d-EDCHQlm57XcUa97Z8-HaY9bGA_pjBnMw87QF3DbMjvDCqUceaBDZ1aQCX2sioXNFpp3Ktn=w426-h240-k-no'
  },
  // Naša káva
  {
    id: 'nasa-kava',
    name: 'Naša káva',
    types: ['cafe'],
    address: 'Levočská 370/36, 064 01 Stará Ľubovňa',
  rating: 5.0,
  ratingCount: 21,
    weeklyHours: {
      mon: { open: '08:00', close: '18:00' },
      tue: { open: '08:00', close: '18:00' },
      wed: { open: '08:00', close: '18:00' },
      thu: { open: '08:00', close: '18:00' },
      fri: { open: '08:00', close: '18:00' },
      sat: { open: '12:00', close: '17:00' },
      sun: { open: '12:00', close: '17:00' }
    },
    website: 'http://www.nasakava.shop/',
    facebook: 'https://www.facebook.com/nasakavas.r.o',
    image: 'https://scontent.fksc2-1.fna.fbcdn.net/v/t39.30808-6/485318352_650530924367374_5528982152472719369_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=XgjeB0Oa_VAQ7kNvwHFYfCH&_nc_oc=AdlwcHTcNO0txbGftrgYR9DrFpf2lKg7q-5_McWRypYlR2vLwOqTova3FmM60QXIGDQ&_nc_zt=23&_nc_ht=scontent.fksc2-1.fna&_nc_gid=FuP9Rs-HdKIJuto5iJfKYA&oh=00_AfVgIS9tKpTptGbMwOGW2vWeoFBiBFrSQBybFcHgTADoAw&oe=68A6205A',
    menu: 'https://www.nasakava.shop/kategoria-produktu/zrnkova-kava/',
  },
  // Bistro Štelka
  {
    id: 'bistro-stelka',
    name: 'Bistro Štelka',
    types: ['restaurant'],
    address: 'Nová Ľubovňa 666, 065 11 Nová Ľubovňa',
  rating: 4.5,
  ratingCount: 155,
    weeklyHours: {
      mon: { open: '14:00', close: '21:45' },
      tue: { open: '14:00', close: '21:45' },
      wed: { open: '14:00', close: '21:45' },
      thu: { open: '14:00', close: '21:45' },
      fri: { open: '14:00', close: '22:45' },
      sat: { open: '15:30', close: '22:45' },
      sun: { open: '15:30', close: '21:45' }
    },
    website: 'http://www.stelka.sk/',
    facebook: 'https://www.facebook.com/www.stelka.sk/',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noAnGW2lxYc3AOuR8HIJ9UilkCOgxk3DS_9CrPwRgesdYut-q_K_DwzoGkpx7Z0pn-CPwXV5qP8Rj_J4E6KpvbG6Yrc3Fm_6RyX2sY3dpUbX5tj7Qa6IPxV0y8vmHLrnUunyAW_iA=w408-h544-k-no',
    menu: 'https://stelka.sk/section:nase-menu/pizza',
  },
  // Šípka Klub
  {
    id: 'sipka-klub',
    name: 'Šípka Klub',
    types: ['pub'],
    address: 'Hviezdoslavova 92, 064 01 Stará Ľubovňa',
  rating: 4.3,
  ratingCount: 59,
    weeklyHours: {
      mon: { open: '16:00', close: '23:00' },
      tue: { open: '16:00', close: '23:00' },
      wed: { open: '16:00', close: '23:00' },
      thu: { open: '16:00', close: '23:00' },
      fri: { open: '16:00', close: '00:00' },
      sat: { open: '14:00', close: '00:00' },
      sun: { open: '14:00', close: '22:00' }
    },
    facebook: 'https://www.facebook.com/profile.php?id=100063732541524',
    image: 'https://scontent.fksc2-1.fna.fbcdn.net/v/t39.30808-6/487994754_1229577639176643_4344249935378039806_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=xxH3uMVn8joQ7kNvwH7lFkT&_nc_oc=AdnFHX61Bqm1eYUtyd_p7v8yS5TdUv26YtY84pGkmjlqCaMGGY0l9HIZT0IVRyd7U28&_nc_zt=23&_nc_ht=scontent.fksc2-1.fna&_nc_gid=Bwq_ayIL3c-nutgkFopWwA&oh=00_AfVRBhDQrLS3RERAaUpBTAQVNS2fpHlF-WApkaRQSoot4g&oe=68A63252'
  },
  // Penzión Koliba
  {
    id: 'penzion-koliba',
    name: 'Penzión Koliba Stará Ľubovňa',
    types: ['restaurant'],
    address: 'Popradská 1769/70, 064 01 Stará Ľubovňa',
  rating: 4.0,
  ratingCount: 1068,
    restaurantType: 'tradičná',
    weeklyHours: {
      mon: { open: '07:30', close: '18:00' },
      tue: { open: '07:30', close: '18:00' },
      wed: { open: '07:30', close: '18:00' },
      thu: { open: '07:30', close: '18:00' },
      fri: { open: '07:30', close: '18:00' },
      sat: { open: '10:00', close: '19:00' },
      sun: { open: '10:00', close: '19:00' }
    },
    website: 'http://www.koliba-lubovna.sk/',
    facebook: 'https://www.facebook.com/kolibastaralubovna/?locale=sk_SK',
    image: 'https://scontent.fksc2-1.fna.fbcdn.net/v/t39.30808-6/464710339_8873053629412270_5093198155991740227_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=HhnJ9rulIQcQ7kNvwF4AuxS&_nc_oc=AdmyK_FnY0jtZI1MY5AMBlFserCwP9rvHMYfYzHrwXBuwX3C5v-MJM1ADxfMb79VWk8&_nc_zt=23&_nc_ht=scontent.fksc2-1.fna&_nc_gid=aw6IQ4lqUbkMu5yLj-FJnQ&oh=00_AfVLK9yFrOa_BTs3sdlnKGuylqjNxfy1Ka_QO2oeQM3GLQ&oe=68A64481',
    menu: 'http://www.koliba-lubovna.sk/dennemenu/koliba-jedalny-listok.pdf',
    dailyMenu: 'http://www.koliba-lubovna.sk/dennemenu/menu.pdf'
  },
    // Bururu pub
  {
    id: 'bururu-pub',
    name: 'Bururu Pub',
    types: ['pub'],
    address: 'Garbiarska 64/1, Stara lubovna, Slovakia, 06401',
  rating: 4.5,
  ratingCount: 79,
    restaurantType: 'normal',
    weeklyHours: {
      mon: { open: '15:00', close: '00:00' },
      tue: { open: '15:00', close: '00:00' },
      wed: { open: '15:00', close: '00:00' },
      thu: { open: '15:00', close: '00:00' },
      fri: { open: '15:00', close: '02:00' },
      sat: { open: '16:00', close: '02:00' },
      sun: { open: '16:00', close: '00:00' }
    },
    facebook: 'https://www.facebook.com/bururupub/?locale=sk_SK',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZub8SIyiJpHPT2_6SNPGWKIP2TV-rYj5vrQ&s',
    instagram: 'https://www.instagram.com/bururu_pub/',
  },
  // Tenisový Klub Stará Ľubovňa Sport Bar
  {
    id: 'tenisovy-klub-sport-bar',
    name: 'Tenisový Klub Stará Ľubovňa Sport Bar',
    types: ['pub'],
    address: 'Továrenská 1342/30, 064 01 Stará Ľubovňa',
  rating: 4.6,
  ratingCount: 54,
    weeklyHours: {
      mon: { open: '11:00', close: '22:00' },
      tue: { open: '11:00', close: '22:00' },
      wed: { open: '11:00', close: '22:00' },
      thu: { open: '11:00', close: '22:00' },
      fri: { open: '11:00', close: '22:00' },
      sat: { open: '11:00', close: '22:00' },
      sun: { open: '11:00', close: '22:00' }
    },
    website: 'https://www.tenislubovna.sk/sport-bar/',
    image: 'https://www.tenislubovna.sk/resources/App/201810102127240.dscn1190-1.jpg',
    menu: 'https://www.tenislubovna.sk/napojovy-listok/',
  },
  // Pohostinstvo Dreveňák
  {
    id: 'pohostinstvo-drevenak',
    name: 'Pohostinstvo Dreveňák',
    types: ['pub'],
    address: 'Továrenská 42, 064 01 Stará Ľubovňa',
    weeklyHours: {
      mon: { open: '06:30', close: '16:00' },
      tue: { open: '06:30', close: '16:00' },
      wed: { open: '06:30', close: '16:00' },
      thu: { open: '06:30', close: '16:00' },
      fri: { open: '06:30', close: '16:00' },
      sat: null,
      sun: null
    },
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr90ZovpN5sugdM8Qb9dEP2MaW0oQzLkGE7L3aQ0_iyDV7CYT5IV8TjcueHnAZYrU5BfYiJnDNQtapRNRm0pfxgRQptYQ_Jv989Q8NWtbLfneQ_m9fkgbEh7Z7lzBL9thVArNtM=s1360-w1360-h1020-rw'

  },
  // Hostinec u Karola
  {
  id: 'u-karola',
  name: 'Hostinec u Karola',
  types: ['pub'],
  address: 'Garbiarska 70/7, 064 01 Stará Ľubovňa',
  weeklyHours: {
    mon: { open: '06:30', close: '19:30' },
    tue: { open: '06:30', close: '19:30' },
    wed: { open: '06:30', close: '19:30' },
    thu: { open: '06:30', close: '20:00' },
    fri: { open: '06:30', close: '20:30' },
    sat: { open: '06:30', close: '13:00' },
    sun: { open: '06:30', close: '13:00' }
  },
  image: 'https://lh5.googleusercontent.com/proxy/6F1fZKW6vuGWux3yfs2ZW9LnF6f7GrrREmPooLnVknoG-T_sQidcyDtLtg_0It8czvx5W29YRNPHte5UvI5MFQOQ'

},
// Pekárová žena
{
    id: 'pekarova-zena',
  name: 'Pekárová žena',
  types: ['bakery','cafe'],
  address: 'Námestie sv. Mikuláša 16, 064 01 Stará Ľubovňa',
  weeklyHours: {
    mon: { open: '07:00', close: '17:00' },
    tue: { open: '07:00', close: '17:00' },
    wed: { open: '07:00', close: '17:00' },
    thu: { open: '07:00', close: '17:00' },
    fri: { open: '07:00', close: '17:00' },
    sat: { open: '07:00', close: '11:00' },
    sun: null

  },
  image: 'https://www.pekarovazena.sk/wp-content/uploads/2023/10/logo.svg#208',
  website: 'https://www.pekarovazena.sk/',
  instagram: 'https://www.instagram.com/pekarovazena/',
  facebook: 'https://www.facebook.com/pekarovazena',
},
];
