import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
// import { resolve } from 'dns';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    formImage!: FormGroup;
    currency: any;

    // Headers Setup
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    httpOptions = {
        headers: this.headers,
    };

    header = {
        'Content-Type': 'application/json',
      };

    public url = environment.url;
    public urlProd = environment.urlProd;

    constructor(
        private http?: HttpClient,
        private fb?: FormBuilder,
        // private toastr: ToastrService,
        // private toastr: ToastrService
    ) {
        this.initImageForm();
        this.currency = [];
    }


    // HTTP get
    
    private handleError(error: any) {
        return throwError(error);
    }

    get(endpoint: string, body?: Record<string, any>): Observable<any> {
        if (body) {
            let req: String = '';
            // tslint:disable-next-line:forin
            for (const key in body) {
                req += `${key}=${body[key]}&`;
            }
            endpoint += '?' + req;
        }
        console.log(this.url + '/' + endpoint);
        return this.http
            .get<[]>(this.url + '/' + endpoint,  { 'headers': this.header })
            // .pipe(tap(), catchError(this.handleError));
    }

    // HTTP post
    post(endpoint: string, body: any): Observable<any> {

        console.log("la requette Post: ", this.url + '/' + endpoint);
        return this.http.post(this.url + '/' + endpoint, body, { 'headers': this.header })
        // .pipe(tap(), catchError(this.handleError));
    }

    // HTTP put
    put(endpoint: string, body: any): Observable<any> {
        console.log("la requette Put: ", this.url + '/' + endpoint);
        return this.http.put(this.url + '/' + endpoint, body, { 'headers': this.header })
        .pipe(tap(), catchError(this.handleError));
    }

    // HTTP delete
    delete(endpoint: string, body?: any): Observable<any> {
        console.log("la requette Delete: ", this.url + '/' + endpoint);
        return this.http.delete(this.url + '/' + endpoint,  { 'headers': this.header });
    }

    // HTTP pact
    patch(endpoint: string, body?: any): Observable<any> {
        return this.http.patch(this.url + '/' + endpoint, JSON.stringify(body));
    }




    // Get the app token
    getAppToken() {

        this.http.get(`${this.url}/rest/session/token`).subscribe(success => {
            localStorage.setItem('app-token', JSON.stringify(success));
        }, error => {
            localStorage.setItem('app-token', JSON.stringify(error.error.text));
        });
    }

    // Set image entity
    setImageEntity(data: any) {

        const imageEntity = {
            _links: {
                self: data.links,
                type: {
                    href: this.url + '/jsonapi/file/image'
                }
            },
            uuid: [{ value: data.attributes.uuid }],
            lang: data.attributes.langcode || 'fr',
            alt: data.attributes.field_image_alt_text,
            title: data.attributes.field_image_title_text,
            url: data.attributes.url,
            width: '259',
            height: '195'
        };

        console.log(imageEntity);

        return imageEntity;
    }

    // generate random string with
    randomString() {

        let randomtext = '';
        let ramdomnumber = '';
        let text = '';
        const alpha = 'ABCDEFGHJKLMPQRSTUVWXYZabcdefghjklmpqrstuvwxyz';
        const chiffre = '0123456789';
        const date = new Date();

        randomtext = alpha.charAt(Math.floor(Math.random() * alpha.length));
        ramdomnumber = chiffre.charAt(Math.floor(Math.random() * chiffre.length));
        text = date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours()
            + date.getMinutes() + date.getSeconds() + ramdomnumber;


        return parseInt(text, 10);
    }

    

    // Init the image form
    initImageForm() {
        this.formImage = this.fb.group({
            filename: ['', Validators.required],
            filemime: ['', Validators.required],
            data: ['', Validators.required],
            self: ['', Validators.required],
            type: ['', Validators.required],
            uuid: ['', Validators.required],
            lang: [''],
            alt: [''],
            title: [''],
            width: ['', Validators.required],
            height: ['', Validators.required]
        });
    }


    // Add the an image
    addImage(event: any): Promise<any> {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            if (event.target.files && event.target.files.length > 0) {

                const file = event.target.files[0];
                console.log(file);
                reader.readAsDataURL(file);

                reader.onload = () => {

                    const imageData: any = reader.result;
                    this.formImage.get('filename').setValue(file.name);
                    this.formImage.get('filemime').setValue(file.type);
                    this.formImage.get('data').setValue(imageData.split(',')[1]);
                    this.formImage.get('self').setValue('');
                    this.formImage.get('type').setValue('');
                    this.formImage.get('uuid').setValue('');
                    this.formImage.get('lang').setValue('');
                    this.formImage.get('alt').setValue('');
                    this.formImage.get('title').setValue('');
                    this.formImage.get('width').setValue('');
                    this.formImage.get('height').setValue('');
                    resolve(this.formImage.value);

                };
            } else {
                reject(null);
            }
        });
    }

    // Set the user access token.
    setAccessToken(token: string) {
        return localStorage.setItem('token', token);
    }

    // Get the user access token.
    getAccessToken() {
        return localStorage.getItem('token');
    }


    // Set the user refresh token.
    setRefreshToken(token: string) {
        return localStorage.setItem('refresh-token', JSON.stringify(token));
    }

    // Get the user refresh token.
    getRefreshToken() {
        return JSON.parse(localStorage.getItem('refresh-token') || '');
    }

    // Construct data params
    // tslint:disable-next-line:ban-types
    constructParam(keys: Array<any>, values: Array<any>): Object {

        const param = new Object();

        for (let i = keys.length - 1; i >= 0; i--) {
            Object.defineProperty(param, keys[i], { value: values[i] });
        }

        return param;

    }


}