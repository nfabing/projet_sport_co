import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-player',
  templateUrl: './login-player.page.html',
  styleUrls: ['./login-player.page.scss'],
})
export class LoginPlayerPage implements OnInit {

  data: any;

  constructor(private formBuilder: FormBuilder, private storage: Storage, private httpClient: HttpClient, private router: Router) {
  }

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  public submit() {
    this.data = this.loginForm.value;
    console.log(this.data);
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

  ionViewWillEnter() {
    this.storage.get('id_user').then((val) => {
      console.log(val);
    });
  }

  async processForm() {
    try {
      const postData = new HttpParams().set('account', 'player').set('email' , this.data['email']).set('password' , this.data['password']);
      this.httpClient.post('https://nicolasfabing.fr/ionic/login_player.php' , postData).subscribe(post => {
        console.log(post[0]['id']);
        this.storage.set('id_user', post[0]['id'].toString());
        this.storage.set('id_club', '0');
        this.router.navigate(['']);//TODO Chemin page d'accueill
      }, error => {
        console.log(error);
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
