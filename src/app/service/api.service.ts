import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastController} from '@ionic/angular';

const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
// headers.append('authentication', `${student.token}`);

const options = {headers};

@Injectable({
    providedIn: 'root'
})


export class ApiService {
    baseUrl = 'http://localhost:3001/';


    constructor(private https: HttpClient, public toastController: ToastController) {
    }

    /*-----------------------------
      Generic methods
    -----------------------------*/

    get(endpoint) {
        return this.https.get<any>(`${this.baseUrl}${endpoint}`, options);
    }

    post(endpoint: string, body: {}) {
        return this.https.post<any>(`${this.baseUrl}${endpoint}`, body, options);
    }

    put(endpoint: string, body: {}) {
        return this.https.put<any>(`${this.baseUrl}${endpoint}`, body, options);
    }

    delete(endpoint: string) {
        return this.https.delete(`${this.baseUrl}${endpoint}`,  options);
    }


    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

    // put method
    // put(endpoint: string, payload: any, id) {
    //     return this.https.put(`${this.baseUrl}${endpoint}/${id}/edit`, payload);
    // }
}
