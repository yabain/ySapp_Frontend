// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://ysapp-api.yaba-in.com',
  url: 'https://ysapp-api.yaba-in.com',
  urlProd: 'https://ysapp-api.yaba-in.com',
  urlToSendMessage: 'https://ysapp-api.yaba-in.com',

  firebase:{
    apiKey: "AIzaSyAyTgIacuPFFIjdMqLAEScG0JtqVMFAv4c",
    authDomain: "mood-7ddac.firebaseapp.com",
    databaseURL: "https://mood-7ddac-default-rtdb.firebaseio.com",
    projectId: "mood-7ddac",
    storageBucket: "mood-7ddac.appspot.com",
    messagingSenderId: "1069753768451",
    appId: "1:1069753768451:web:9d23b9501302fefc9b0c36",
    measurementId: "G-3YN1JEBWWM"
  },
  keycloak:{
    secret:"AqetVGJS1jk7s1gcyll0ivvREYRj6R9c",
    clientId:"ysapp-frontend",
    realm:"Yaba-In",
    url:"https://accounts.yaba-in.com/"
  },

  // ySapp Firebase credentials
 firebaseConfig : {
  apiKey: "AIzaSyAnVkjc79tTLkkJYhSghNUJHqR24_kLw60",
  authDomain: "ysapp-11636.firebaseapp.com",
  databaseURL: "https://ysapp-11636-default-rtdb.firebaseio.com",
  projectId: "ysapp-11636",
  storageBucket: "ysapp-11636.appspot.com",
  messagingSenderId: "95261052164",
  appId: "1:95261052164:web:5f2946cbb7c87e05591451",
  measurementId: "G-BKDHYVLG9R"
}


};
