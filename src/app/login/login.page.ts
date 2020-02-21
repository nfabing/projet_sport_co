import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data: any;

  constructor(private formBuilder: FormBuilder, private storage: Storage, private httpClient: HttpClient, private router: Router) {
  }


  loginForm = this.formBuilder.group({
    type: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  public submit() {
    this.data = this.loginForm.value;
    console.log(this.data);
    this.processForm();
  }

  async processForm() {
      try {
        console.log('test');
        const postData = new HttpParams()
            .set('type', this.data['type'].toString())
            .set('email', this.data['email'].toString())
            .set('password', this.data['password'].toString());
        this.httpClient.post('https://nicolasfabing.fr/ionic/login.php', postData)
            .subscribe(post => {
              console.log(post);
            }, error => {
              console.log(error);
            });
      } catch (e) {
        console.log(e);
        console.log('test2');
      }
  }

  get type() {
    return this.loginForm.get('type');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }




  public errorMessages = {
    type: [
      {type: 'required', message: 'Type is required'},
    ],
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


}
