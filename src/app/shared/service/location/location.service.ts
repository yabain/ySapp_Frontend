import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() { }
  region() {
    
    //Cameroon Regions
    return [
      {
        id:1,
        name: 'Adamaoua',
      },
      {
        id:2,
        name: 'Centre',
      },
      {
        id:3,
        name: 'Est',
      },
      {
        id:4,
      	name: 'Extreme-nord',
      },
      {
        id:5,
        name: 'Littoral',
      },
      {	id:6,
        name: 'Nord',
      },
      {
        id:7,
        name: 'Nord-ouest',
      },
      {
        id:8,
        name: 'Ouest',
      },
      {
        id:9,
        name: 'Sud',
      },
      {
        id:10,
        name: 'sud-ouest',
      }
    ];
  }

  // Cameroon Cities by Region ID
  city() {
    return [
      {
        
        id:1,
        name: 'Banyo',
      },
      {
        id:1,
        name: 'Déo',
      },
      {
        id:1,
        name: 'Dir',
      
      },
      {
        id:1,
        name: 'Djerem',
      },
      {
        id:1,
        name: 'Kimi',
      },
      {
        id:1,
        name: 'Faro',
      },
      {
        id:1,
        name: 'Kobi',
      },
      {
        id:1,
        name: 'Mayo',
      },
      {
        id:1,
        name: 'Mbere',
      },
      {
        id:1,
        name: 'Meiganga',
      },
      {
        id:1,
        name: 'Ngaoundal',
      },
      {
        id:1,
        name: 'Ngaoundéré',
      },
      {
        id:1,
        name: 'Nganha',
      },
      {
        id:1,
        name: 'Tello',
      },
      {
        id:1,
        name: 'Tibati',
      },
      {
        id:1,
        name: 'Tignere',
      },
      {
        id:2,
        name: 'Akonolinga',
      },
      {
        id:2,
        name: 'Bafia',
      },
      {
        id:2,
        name: 'Eseka',
      },
      {
        id:2,
        name: 'Haut-sanaga',
      },
      {
        id:2,
        name: 'Lekie',
      },
      {
        id:2,
        name: 'Mbam-et-inoubou',
      },
      {
        id:2,
        name: 'Mbam-et-kim',
      },
      {
        id:2,
        name: 'Mefou-et-afamba',
      },
      {
        id:2,
        name: 'Mfoundi',
      },
      {
        id:2,
        name: 'Nanga eboko',
      },
      {
        id:2,
        name: 'Nyong-et-kelle',
      },
      {
        id:2,
        name: 'Nyong-et-mfoumou',
      },
      {
        id:2,
        name: 'Nyong-et-so-o',
      },
      {
        id:2,
        name: 'Yaoundé',
      },
      {
        id:3,
        name: 'Abong-mbang',
      },
      {
        id:3,
        name: 'Angossas',
      },
      {
        id:3,
        name: 'Atok',
      },
      {
        id:3,
        name: 'Dimako',
      },
      {
        id:3,
        name: 'Batouri',
      },
      {
        id:3,
        name: 'Bertoua',
      },
      {
        id:3,
        name: 'Belabo',
      },
      {
        id:3,
        name: 'Betare-oya',
      },
      {
        id:4,
        name: 'Aboukouss',
      },
      {
        id:4,
        name: 'Abrinko',
      },
      {
        id:4,
        name: 'Abou-djali',
      },
      {
        id:4,
        name: 'Adarwala',
      },
      {
        id:4,
        name: 'Agoyo',
      },
      {
        id:4,
        name: 'Alakire',
      },
      {
        id:4,
        name: 'Alifare',
      },
      {
        id:4,
        name: 'Alrada',
      },
      {
        id:4,
        name: 'Amchide',
      },
      {
        id:4,
        name: 'Amdane',
      },
      {
        id:4,
        name: 'Amdjagara dabba',
      },
      {
        id:4,
        name: 'Dargala',
      },
      {
        id:4,
        name: 'Diamara',
      },
      {
        id:4,
        name: 'Doulo',
      },
      {
        id:4,
        name: 'Kaele',
      },
      {
        id:4,
        name: 'Kalfou',
      },
      {
        id:4,
        name: 'Kousseri',
      },
      {
        id:4,
        name: 'Logone-birni',
      },
      {
        id:4,
        name: 'Maroua',
      },
      {
        id:5,
        
        name: 'Bare',
      },
      {
        id:5,
        name: 'Bonlea',
      },
      {
        id:5,
        name: 'Douala',
      },
      {
        id:5,
        name: 'Dibombare',
      },
      {
        id:5,
        name: 'Dizangue',
      },
      {
        id:5,
        name: 'Ebono',
      },
      {
        id:5,
        name: 'Edea',
      },
      {
        id:5,
        name: 'Kekem',
      },
      {
        id:5,
        name: 'Loum',
      },
      {
        id:5,
        name: 'Logbadjeck',
      },
      {
        id:5,
        name: 'Monako',
      },
      {
        id:5,
        name: 'Massok',
      },
      {
        id:5,
        name: 'Moungko',
      },
      {
        id:5,
        name: 'Manjo',
      },
      {
        id:5,
        name: 'Mbanga',
      },
      {
        id:5,
        name: 'Ndonkbian',
      },
      {
        id:5,
        name: 'Nkam',
      },
      {
        id:5,
        name: 'Ndom',
      },
      {
        id:5,
        name: 'Ngambe',
      },
      {
        id:5,
        name: 'Ngambe',
      },
      {
        id:5,
        name: 'penja',
      },
      {
        id:5,
        name: 'Pouma',
      },
      {
        id:5,
        name: 'Souza',
      },
      {
        id:5,
        name: 'Wouri',
      },
      {
        id:5,
        name: 'Yabassi',
      },
      {
        id:5,
        name: 'Yingi',
      },
      {
        
        id:6,
        name: 'Bacheore',
      },
      {
        
        id:6,
        name: 'Barnake',
      },
      {
        
        id:6,
        name: 'Bali',
      },
      {
        
        id:6,
        name: 'Banyo',
      },
      {
        
        id:6,
        name: 'Bibemi',
      },
      {
        
        id:6,
        name: 'Garoua',
      },
      {
        id:7,
        name: 'Babessi',
      },
      {
        id:7,
        name: 'Bafou',
      },
      {
        id:7,
        name: 'Bali kumbat',
      },
      {
        id:7,
        name: 'Bamenda',
      },
      {
        id:7,
        name: 'Benakuma',
      },
      {
        id:7,
        name: 'Batibo',
      },
      {
        id:7,
        name: 'Balikumbat',
      },
      {
        id:7,
        name: 'Bui',
      },
      {
        id:7,
        name: 'Boyo',
      },
      {
        id:7,
        name: 'Donga',
      },
      {
        id:7,
        name: 'Elak-oku',
      },
      {
        
        id:8,
        name: 'Bafang',
      },
      {
        
        id:8,
        name: 'Bafoussam',
      },
      {
        
        id:8,
        name: 'Bandjoun',
      },
      {
        
        id:8,
        name: 'Bangangte',
      },
      {
        
        id:8,
        name: 'Bangou',
      },
      {
        
        id:9,
        name: 'Akom',
      },
      {
        
        id:9,
        name: 'Akia',
      },
      {
        
        id:9,
        name: 'Ambam',
      },
      {
        
        id:9,
        name: 'Bangelis',
      },
      {
        
        id:9,
        name: 'Bipindi',
      },
      {
        
        id:9,
        name: 'Biwong',
      },
      {
        
        id:9,
        name: 'Bane',
      },
      {
        id:9,
        name: 'Bulu',
      },
      {
        
        id:9,
        name: 'Buea',
      },
      {
        
        id:9,
        name: 'campo',
      },
      {
        
        id:9,
        name: 'dJA-ET-LOBO',
      },
      {
        
        id:9,
        name: 'Djoum',
      },
      {
        
        id:9,
        name: 'Ebolowa',
      },
      {
        
        id:9,
        name: 'Haut-nyong',
      },
      {
        
        id:9,
        name: 'Kye-ossi',
      },
      {
        
        id:9,
        name: 'Kumba',
      },
      {
        
        id:9,
        name: 'Kribi',
      },
      {
        
        id:9,
        name: 'Ma-a',
      },
      {
        
        id:9,
        name: 'Mamfe',
      },
      {
        
        id:9,
        name: 'Menji',
      },
      {
        
        id:9,
        name: 'Meyomessala',
      },
      {
        
        id:9,
        name: 'Mvangan',
      },
      {
        
        id:9,
        name: 'Meyomessi',
      },
      {
        
        id:10,
        name: 'Fako',
      },
      {
        
        id:10,
        name: 'Koupe-manengouba',
      },
      {
        
        id:10,
        name: 'Lebialem',
      },
      {	
        id:10,
        name: 'Mamny',
      },
      {	
        id:10,
        name: 'Meme',
      },
      {
        
        id:10,
        name: 'Ndian',
      },
      {
        
        id:10,
        name: 'Nguti',
      },
      {
        
        id:10,
        name: 'Tombel',
      }
      
       ];
  }
}
