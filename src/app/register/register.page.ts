import {Component, OnInit} from '@angular/core';

import {tryCatch} from 'rxjs/internal-compatibility';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {parseJson} from '@angular-devkit/core';
import {GlobalService} from '../global.service';
import {AlertController, ToastController} from '@ionic/angular';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    data: any;

    constructor(private formBuilder: FormBuilder, private storage: Storage, private httpClient: HttpClient, private router: Router,
                private globalService: GlobalService, private alertController: AlertController, private toastController: ToastController) {
    }

    registrationForm = this.formBuilder.group({
        lastName: [''],
        firstName: [''],
        email: [''],
        password1: [''],
        password2: [''],
        birthDate: [''],
        birthPlace: [''],
        birthCountry: [''],
        foot: [''],
        positions: [''],
        size: [''],
        weight: [''],
        level: ['']
    });

    public submit() {
        this.data = this.registrationForm.value;
        this.processForm();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Impossible de s\'inscrire',
            message: 'Email déjà utilisé ',
            buttons: ['Réssayer']
        });

        await alert.present();
    }

    async showToast(msg): Promise<void> {
        const toast = await this.toastController.create({
            message: msg,
            color: 'dark',
            duration: 2000
        });
        await toast.present();
    }

    async processForm() {


        if (this.registrationForm.value['password1'] === this.registrationForm.value['password2']) {
            try {
                const postData = new HttpParams()
                    .set('lastName', this.data['lastName'].toString())
                    .set('firstName', this.data['firstName'].toString())
                    .set('email', this.data['email'].toString())
                    .set('password1', this.data['password1'].toString())
                    .set('birthDate', this.data['birthDate'].toString())
                    .set('birthPlace', this.data['birthPlace'].toString())
                    .set('birthCountry', this.data['birthCountry'].toString())
                    .set('foot', this.data['foot'].toString())
                    .set('positions', this.data['positions'].toString())
                    .set('size', this.data['size'].toString())
                    .set('weight', this.data['weight'].toString())
                    .set('level', this.data['level'].toString());

                this.httpClient.post('https://nicolasfabing.fr/ionic/register.php', postData)
                    .subscribe(post => {
                        if (post['id'] === 0 || post['id'] === '0') {
                            this.presentAlert();
                        } else {
                            console.log(post[0]['id']);
                            this.storage.set('id_user', post[0]['id'].toString());
                            this.storage.set('id_club', '0');
                            // Ajout des valeurs au service
                            this.globalService.idClub = 0;
                            this.globalService.idUser = post[0].id;

                            this.router.navigate(['fil-actu']);
                        }
                    }, error => {
                        console.log(error);
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            this.showToast('Les mots de passe ne correspondent pas !');
        }


    }

    get lastName() {
        return this.registrationForm.get('lastName');
    }

    get firstName() {
        return this.registrationForm.get('firstName');
    }

    get email() {
        return this.registrationForm.get('email');
    }

    get password1() {
        return this.registrationForm.get('password1');
    }

    get password2() {
        return this.registrationForm.get('password2');
    }

    get birthDate() {
        return this.registrationForm.get('birthDate');
    }

    get birthPlace() {
        return this.registrationForm.get('birthPlace');
    }

    get birthCountry() {
        return this.registrationForm.get('birthCountry');
    }

    get foot() {
        return this.registrationForm.get('foot');
    }

    get weight() {
        return this.registrationForm.get('weight');
    }

    get level() {
        return this.registrationForm.get('level');
    }

    get positions() {
        return this.registrationForm.get('positions');
    }

    get size() {
        return this.registrationForm.get('size');
    }

    public errorMessages = {
        lastName: [
            {type: 'required', message: 'Nom is required'},
            {type: 'maxlength', message: 'Nom cant be longer than 100 characters'}
        ],
        firstName: [
            {type: 'required', message: 'Prénom is required'},
            {type: 'maxlength', message: 'Prénom cant be longer than 100 characters'}
        ],
        email: [
            {type: 'required', message: 'Email is required'},
            {type: 'pattern', message: 'Please enter a valid email address'}
        ],
        password1: [
            {type: 'required', message: 'Mot de passe is required'},
            {type: 'minlength', message: '8 caractere minimum'}
        ],
        password2: [
            {type: 'required', message: 'Mot de passe is required'},
            {type: 'minlength', message: '8 caractere minimum'}
        ],
        birthDate: [
            {type: 'required', message: 'Date Anniversaire is required'}
        ],
        birthPlace: [
            {type: 'required', message: 'Lieux de naissance is required'}
        ],
        birthCountry: [
            {type: 'required', message: 'Pays de naissance is required'}
        ],
        foot: [
            {type: 'required', message: 'Pied fort is required'}
        ],
        weight: [
            {type: 'required', message: 'Poids is required'}
        ],
        level: [
            {type: 'required', message: 'Niveau is required'}
        ],
        positions: [
            {type: 'required', message: 'Poste is required'}
        ],
        size: [
            {type: 'required', message: 'Taille is required'}
        ]
    };


    ngOnInit() {
    }


}
