import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  providers: [ BarcodeScanner,
    Base64ToGallery],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
