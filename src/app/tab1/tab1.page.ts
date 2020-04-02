import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {User} from '../interface/user';
import {ApiService} from '../service/api.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    qrData = '645';
    scannedCode = null;
    elementType: 'url' | 'canvas' | 'img' = 'canvas';
    user: User;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private base64ToGallery: Base64ToGallery,
        private toastCtrl: ToastController, private storage: Storage, private api: ApiService
    ) {
        storage.get('connectedUser').then((val) => {
            console.log('user !', val);
            this.user = val;
            this.qrData = this.user.solde.toString();
        });
    }

    ngOnInit() {

    }

    scanCode() {
        this.barcodeScanner.scan().then(
            barcodeData => {
                this.scannedCode = barcodeData.text;

                const body = {
                    sourceID: this.scannedCode,
                    clientID: this.user._id,
                    montant: this.qrData
                };
                this.api.post('transaction/create', body).subscribe(result => {
                    this.api.presentToast('Transaction done succefully');
                }, error => {
                    this.api.presentToast('Something gone wrong');
                });
            }
        );
    }

    downloadQR() {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        const imageData = canvas.toDataURL('image/jpeg').toString();
        console.log('data', imageData);
        const data = imageData.split(',')[1];

        this.base64ToGallery.base64ToGallery(data,
            {prefix: '_img', mediaScanner: true})
            .then(async res => {
                    const toast = await this.toastCtrl.create({
                        header: 'QR Code saved in your Photolibrary'
                    });
                }, err => console.log('err: ', err)
            );
    }
}
