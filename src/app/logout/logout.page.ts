import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public storage:Storage, public router:Router) { }

  ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.storage.set('id_user', '0');
    await this.storage.set('id_club', '0');
    this.router.navigate(['login-register']);
  }
}
