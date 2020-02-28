import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalService} from '../global.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login-club',
  templateUrl: './login-club.page.html',
  styleUrls: ['./login-club.page.scss'],
})
export class LoginClubPage implements OnInit {

  data: any;

  constructor(private formBuilder: FormBuilder, private storage: Storage, private httpClient: HttpClient, private router: Router,
              private globalService: GlobalService, private alertController: AlertController) {
  }

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  public submit() {
    this.data = this.loginForm.value;
    this.processForm();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  public errorMessages = {
    email: [
      {type: 'required', message: 'Email is required'},
      {type: 'pattern', message: 'Please enter a valid email address'}
    ],
    password: [
      {type: 'required', message: 'Mot de passe is required'},
      {type: 'minlength', message: '8 caractere minimum'}
    ]
  };


  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Impossible de ce connecter',
      message: 'Email et/ou Mot de passe incorrect',
      buttons: ['Réssayer']
    });

    await alert.present();
  }

  async processForm() {
    try {
      const postData = new HttpParams().set('account', 'club').set('email' , this.data['email']).set('password' , this.data['password']);
      this.httpClient.post('https://nicolasfabing.fr/ionic/login_club.php' , postData).subscribe(post => {
        if (post['id'] === 0 || post['id'] === '0') {
          this.presentAlert();
        } else {
          this.storage.set('id_club', post[0]['id'].toString());
          this.storage.set('id_user', '0');
          /****** Ajout des valeurs au service ******/
          this.globalService.idClub = post[0].id;
          this.globalService.idUser = 0;

          this.router.navigate(['fil-actu']);
        }
      }, error => {
        console.log(error);
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
