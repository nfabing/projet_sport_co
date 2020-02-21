import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-club-register',
    templateUrl: './club-register.page.html',
    styleUrls: ['./club-register.page.scss'],
})

export class ClubRegisterPage implements OnInit {
    data: any;

    constructor(private formBuilder: FormBuilder, private storage: Storage, private httpClient: HttpClient, private router: Router) {
    }


    registrationForm = this.formBuilder.group({
        Name: ['', Validators.required],
        email: ['', Validators.required],
        password1: ['', Validators.required],
        password2: [''],
        level: ['', Validators.required],
        city: ['', Validators.required],
        cityCode: ['', Validators.required]
    });


    public submit() {
        console.log(this.registrationForm.value);
        this.data = this.registrationForm.value;
        this.processForm();
    }

    async processForm() {


        if (this.registrationForm.value['password1'] === this.registrationForm.value['password2']) {
            try {
                const postData = new HttpParams()
                    .set('Name', this.data['Name'].toString())
                    .set('email', this.data['email'].toString())
                    .set('password1', this.data['password1'].toString())
                    .set('city', this.data['city'].toString())
                    .set('cityCode', this.data['cityCode'].toString())
                    .set('level', this.data['level'].toString());

                this.httpClient.post('https://nicolasfabing.fr/ionic/club_register.php', postData)
                    .subscribe(post => {
                        if (post === false) {
                            alert('Email déjà utilisé');
                        } else {
                            console.log(post[0]['id']);
                            this.storage.set('id_club', post[0]['id'].toString());
                            this.router.navigate(['']);//TODO Chemin page d'accueill
                        }
                    }, error => {
                        console.log(error);
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('Le Mot de passe ne correspond pas !');
        }


    }

    get Name() {
        return this.registrationForm.get('Name');
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

    get city() {
        return this.registrationForm.get('city');
    }

    get level() {
        return this.registrationForm.get('level');
    }

    get cityCode() {
        return this.registrationForm.get('cityCode');
    }


    public errorMessages = {
        Name: [
            {type: 'required', message: 'Nom is required'},
            {type: 'maxlength', message: 'Nom cant be longer than 100 characters'}
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
        city: [
            {type: 'required', message: 'Ville is required'}
        ],
        level: [
            {type: 'required', message: 'Niveau is required'}
        ],
        cityCode: [
            {type: 'required', message: 'Code postal is required'},
            {type: 'maxlength', message: 'Un Code Postal est composé de 5 caractères'},
            {type: 'minlength', message: 'Un Code Postal est composé de 5 caractères'}
        ]
    };


    ngOnInit() {
    }

    ionViewWillEnter() {
        this.storage.get('id_user').then((val) => {
            console.log(val);
        });
    }
}
