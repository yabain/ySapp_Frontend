import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { User } from '../../entities/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = new User();

  currentUserSubject:Subject<User> = new Subject<User>();
  public static isUser = true;

  listUser:User[]=[];

  params: any;
  userData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    // private toastr: ToastrService,
    // private authService: AuthService
  ) { }

  /*
*  Set the user informations.
*/
  setUserInformations(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    //this.login.isLoggedIn = true;
  }


  emitUserData()
  {
    this.currentUserSubject.next(this.userData);
  }
  /*  
 *  get the user informations.
 */
// getUserInformations() {
//   console.log(JSON.parse(localStorage.getItem('currentUser')));
//   const data: any = {
//     email: JSON.parse(localStorage.getItem('currentUser')).email,
//     roles: JSON.parse(localStorage.getItem('currentUser')).roles,
//     password: JSON.parse(localStorage.getItem('currentUser')).password,
//     nom: JSON.parse(localStorage.getItem('currentUser')).nom,
//     prenom: JSON.parse(localStorage.getItem('currentUser')).prenom,
//     telephone: JSON.parse(localStorage.getItem('currentUser')).telephone,
//     photo: JSON.parse(localStorage.getItem('currentUser')).photo,
//     region: JSON.parse(localStorage.getItem('currentUser')).region,
//     estAbonne: JSON.parse(localStorage.getItem('currentUser')).estAbonne,
//     estMembre: JSON.parse(localStorage.getItem('currentUser')).estMembre,
//     fonction: JSON.parse(localStorage.getItem('currentUser')).fonction,
//     presention: JSON.parse(localStorage.getItem('currentUser')).presention,
//     facebook: JSON.parse(localStorage.getItem('currentUser')).facebook,
//     twitter: JSON.parse(localStorage.getItem('currentUser')).twitter,
//     linkedin: JSON.parse(localStorage.getItem('currentUser')).linkedin,
//     youtube: JSON.parse(localStorage.getItem('currentUser')).youtube,
//     googlePlus: JSON.parse(localStorage.getItem('currentUser')).googlePlus,
//     instagram: JSON.parse(localStorage.getItem('currentUser')).instagram,
//     flickr: JSON.parse(localStorage.getItem('currentUser')).flickr,
//     website: JSON.parse(localStorage.getItem('currentUser')).website,
//     equipes: JSON.parse(localStorage.getItem('currentUser')).equipes,
//     typeAbonne: JSON.parse(localStorage.getItem('currentUser')).typeAbonne,

// };
//   return data;
// }


  /*
  *  Get local user profile data.
  */
  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.emitUserData();
    if (this.userData) {
      // this.login.isLoggedIn = true;
      return this.userData;
    } else {
      // this.login.isLoggedIn = false;
      return false;
    }
  }

  /*
  * resetPassword is used to reset your password.
  */
  resetPassword() {
    // this.toastr.success('Email Sent');
    this.router.navigate(['login']);
  }

  

  // permet denvoyer le code au user par mail pour reset son password
  sendCodeUserByEmail(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        'email': data
      };
      this.api.post('api/v01/recover-user/by-email?_format=hal_json', JSON.stringify(params)).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // permet de valider le code renseigné par le user
  validateCodeEmailUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        'user.field_email': data.user.field_email,
        'user_code': data.user_code
      };
      this.api.post(`api/v01/recover-user/by-email/validate-code`, JSON.stringify(params)).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // permet de changer le password du user dès lors quil a renseigné le bon code
  changeUserPassword(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        'user.field_email': data.user.field_email,
        'user_code': data.user_code,
        'user.field_password': data.user.field_password
      };
      this.api.post(`api/v01/recover-user/by-email/change-password`, JSON.stringify(params)).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }


  // Permet de get le user connected en renvoyant toutes les infos nécessaires sur le profil du user
  userConnectedInformations(): Promise<any> {

    return new Promise((resolve, reject) => {
      // console.log('de nimporte quoi');
      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      };

      this.api.get('requester/profil', headers)
      .subscribe((response: any) => {
        if (response) {
          // let userData: any[];
          // userData['user.field_email'] = response.result.email;
          // userData['user.field_country'] = response.result.address.contray;
          // userData['user.field_phone'] = response.result.address.mobilePhone;
          // userData['user.field_id'] = response.result._id;
          // userData['user.field_firstName'] = response.result.firstname;
          // userData['user.field_lastName'] = response.result.lastname;

          resolve(response);
          this.userData = response.result;
          this.emitUserData();
          this.setUserInformations(response);
        }

      }, (error: any) => {

        if (error) {
          console.log(error);
          // this.toastr.success(error.message);
          reject(error);
        }
      });
    });
  }

  parseDataToApi(user:User):Record<string|number,any>
  {
    return {
    "email": user.email,
    "status": user.status,
    "password": user.password,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "imageUrl": user.imageUrl,
    "gender": user.gender,
    "phone": user.phone,
    "country": user.country,
    "region": user.region,
    "city": user.city,
    "adress": user.adress,
    "description": user.description,
    "Organisation": user.Organisation,
    "poste": user.poste,
    "birthDay": user.birthDay,
    "dateCreation": user.dateCreation
    }
  }
  // permet d'update les infos d'un user
  UpdateUser(nid: string, token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        // 'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token'))
      }

      const cheminUrl = `${this.api.url}/rest/type/user/user`;
      this.params = {
        '_links': {
          'type': {
            'href': cheminUrl
          }
        },
        // body
        'user.field_firstname': [
          {
            'value': data.user.field_firstname
          }
        ],

        'user.field_surname': [
          {
            'value': data.user.field_surname
          }
        ],

        'user.field_username': [
          {
            'value': data.user.field_username
          }
        ],

        'user.field_addresse_gps': [
          {
            'lat': 52.47878999999999649617166141979396343231201171875,
            'lng': -0.11067700000000000072619688040731489309109747409820556640625
          }
        ],

        'user.field_address': [
          {
            'value': data.user.field_address
          }
        ],

        'user.field_mobile_phone_number': [
          {
            'value': data.user.field_mobile_phone_number
          }
        ],

        'user.field_phone_number': [
          {
            'value': data.user.field_phone_number
          }
        ],

        'user.field_whatsapp_number': [
          {
            'value': data.user.field_whatsapp_number
          }
        ],
        // Les 2 cas qui suivent sont utilisés pour enregistrer le pays du user en fonction de la langue choisie dans le système. N.B: 1 seul cas parmi les 2 est utilisé.

        // Cas 1: ceci est utilisé pour enregistrer le pays du user avec choix de la langue English (uuid est obtenu à partir du numéro 12)
        'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_country': [
          {
            '_links': {
              'type': {
                'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/countries'
              }
            },
            'uuid': [
              {
                'value': data.country_uuid
              }
            ]
          }
        ],

        '_embedded': {
          // Ceci est utilisé s'il y a le ID du type (ID Card ou Passport ou ...) (représente le ID type (ID Card ou Passport) obtenu à partir du numéro 6)
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_id_type': [
            {
              '_links': {
                'type': {
                  'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/id_type'
                }
              },
              'uuid': [
                {
                  'value': data.user.field_id_type
                }
              ]
            }
          ],

          // Ceci est utilisé pour lier l'image au profil du user. On utilise le numéro 7 pour save une image puis récupérer son uuid qu'on renseigne en bas
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user_picture': [
            {
              '_links': {
                'type': {
                  'href': 'http://dev.sdkgames.com/karryngo/rest/type/file/file'
                }
              },
              'uuid': [
                {
                  'value': data.user_picture
                }
              ]

            }
          ],

          // Cas 1: ceci est utilisé pour enregistrer le pays du user avec choix de la langue English (uuid est obtenu à partir du numéro 12)
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_country': [
            {
              '_links': {
                'type': {
                  'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/countries'
                }
              },
              'uuid': [
                {
                  'value': data.user.field_country
                }
              ]

            }
          ],
          // Cas 2: ceci est utilisé pour enregistrer le pays du user avec choix de la langue Français (uuid est obtenu à partir du numéro 13)
          /* 'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_pays': [
            {
              '_links': {
                'type': {
                  'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/pays'
                }
              },
              'uuid': [
                {
                  'value': data.user.field_pays
                }
              ]

            }
          ], */

          // Ceci est utilisé pour enregistrer les différentes langues choisies par le user (uuid est obtenu à partir du numéro 11).
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_language': data.user.field_language || [],

          // ceci est ajouté pour mettre à jour les différents types de service que le user offre (Services offered)
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_choose_type_of_services': data.user.field_choose_type_of_services || [],

          // ceci est utilisé pour mettre à jour le choix du pays avec ces villes
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_interested_countries': data.user.field_interested_countries || [],

          // ceci est utilisé pour mettre à jour les documents personnels du user
          'http://dev.sdkgames.com/karryngo/rest/relation/user/user/user.field_documents': data.user.field_documents || [],
        }
      };
      this.api.patch(`user/${nid}?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // permet d enregistrer les pays y compris les choix des villes fait par le user
  saveCountriesAndCities(token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        // 'X-CSRF-Token': 'L37xETNIYg_slJIQMKlJIti9b5uwdOmKaP_lOnnq4hE' || JSON.parse(localStorage.getItem('app-token'))
      }
      const cheminUrl = `${this.api.url}/rest/type/node/countries`;
      this.params = {
        '_links': {
          'type': {
            'href': cheminUrl
          }
        },
        // représente le nom du pays
        'title': [
          {
            'value': data.title
          }
        ],
        // représente le tableau de JSON des villes saisies
        'user.field_city': data.user.field_city || [],
        'type': [
          {
            'target_id': 'countries'
          }
        ]
      };
      this.api.post(`entity/node?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet de get les infos des pays choisis y compris ces villes pour un user
  getCountriesCitiesUser(token: string, id_node: string): Promise<any> {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/hal+json',
      'Accept': 'application/json',
      // 'X-CSRF-Token': 'L37xETNIYg_slJIQMKlJIti9b5uwdOmKaP_lOnnq4hE' || JSON.parse(localStorage.getItem('app-token'))
    }
    return new Promise((resolve, reject) => {
      this.api.get(`node/${id_node}?_format=hal_json`, headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet d enregistrer un document personnel du user (ID CARD, PROOF OF RESIDENCE, ...)
  saveUserDocument(token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json'
      }
      const cheminUrl = `${this.api.url}/rest/type/file/image`;
      this.params = {
        '_links': {
          'type': {
            'href': cheminUrl
          }
        },
        // ici on mets le nom du fichier suivi de .pdf
        'filename': [{ 'value': data.filename }],
        // ou "application/pdf"
        'filemime': [{ 'value': 'application/octet-stream' }],
        // on mets la valeur du fichier converti en base64
        'data': [{ 'value': data.data }]
      };
      this.api.post(`entity/file?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  //recuperer les informations d'un utilisateur
  // getUserById(id:String):Promise<any>
  // {
  //   return new Promise<any>((resolve,reject)=>{
  //     let user: User = this.listUser.find((u)=>u._id==id);
  //     if(user!=undefined) resolve(user);
  //     else{
  //       this.api.get(`user/profil/${id}`,{
  //         'Authorization': 'Bearer ' + this.api.getAccessToken(),

  //       }).subscribe(success => {
  //         if(success)
  //         {
  //           if(success.resultCode==0)
  //           {
  //             resolve(this.parseDataFromApi(success.result));
  //           }
  //           else reject(success)

  //         }
  //         else reject(success)
  //       }, error => {
  //         reject(error);
  //       })
  //     }
  //   })
  // }

}
