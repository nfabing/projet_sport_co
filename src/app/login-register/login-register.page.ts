import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  constructor(public router: Router, private menuController: MenuController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.enable(false, 'main');
  }

  login(params) {
    if(params === 'player'){
      this.router.navigate(['login-player']);
    }
    if(params === 'club'){
      this.router.navigate(['login-club']);
    }
  }
  register(params) {
    if(params === 'player'){
      this.router.navigate(['register']);
    }
    if(params === 'club'){
      this.router.navigate(['club-register']);
    }
  }



}
