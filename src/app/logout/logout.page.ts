import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public storage: Storage, public router: Router, private toastController: ToastController) {
  }

  ngOnInit() {
  }
  async showToast(msg): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      color: 'dark',
      duration: 2000
    });
    await toast.present();
  }

  async ionViewWillEnter() {
    await this.storage.set('id_user', '0');
    await this.storage.set('id_club', '0');
    this.showToast('Déconnecté');
    await this.router.navigate(['login-register']);
  }
}
