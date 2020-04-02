import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss']
})
export class RegistrationPage implements OnInit {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    register() {
        this.api.post('users/register', this.registerForm.value).subscribe(res => {
            console.log(res);
            this.router.navigate(['/login']);
            this.api.presentToast('Succefully registred');

        }, error => {
            console.log(error);
            this.api.presentToast(error.message);
        });
    }
}
