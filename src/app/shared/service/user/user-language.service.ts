import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})

export class LanguageService {
    private keyLanguage = 'userLanguage';
    private userLanguage: string = 'fr';
    private supportedLanguages = ['fr', 'en'];

    constructor(
        translate: TranslateService,
        public storage: Storage,
    ) {
        this.initLanguage();
    }

    initLanguage() {
        // let value = 'fr';
        // get a key/value pair to phone storage
        this.storage.get(this.keyLanguage).then((val) => {
            this.userLanguage = val;
            console.log('get storage valeur de la langue: ', val);
        });

        // eslint-disable-next-line no-cond-assign
        if (!this.userLanguage) {
            this.userLanguage = 'fr';
        }
        else {
            // const phoneLanguage = 'fr';  // remplacer 'fr' par une fontion qui récupère la langue par défaut du téléphone
            // if (this.supportedLanguages.includes(phoneLanguage)) {
            //     this.userLanguage = phoneLanguage;
            //     this.storage.set(this.keyLanguage, phoneLanguage);
            // } else { this.userLanguage = 'fr';}
        }

    }

    setLanguage(language: any) {
        // eslint-disable-next-line no-underscore-dangle
        this.userLanguage = language;
        console.log(this.userLanguage);
        // set a key/value in phone storage
        this.storage.set(this.keyLanguage, this.userLanguage);
        this.storage.get(this.keyLanguage).then((val) => {
            console.log('valeur set de la langue: ', val);
        });
        // eslint-disable-next-line no-underscore-dangle
        // this.translate.use(this.userLanguage);

        // to refresh page
        window.location.reload();
    }

    getLanguage() {
        // eslint-disable-next-line no-underscore-dangle
        return this.userLanguage;
    }

    getAvailableLanguage() {
        return this.supportedLanguages;
    }
}
