import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private storage: Storage) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        this.api.post('users/authenticate', this.loginForm.value).subscribe(result => {
            this.storage.set('connectedUser', result);
             this.router.navigate(['/payment']);
            this.api.presentToast('Welcome ' + result.firstName);
        }, error => {
            this.api.presentToast(error.error.message);
            // this.router.navigateByUrl('/payment');
        });
    }
}
