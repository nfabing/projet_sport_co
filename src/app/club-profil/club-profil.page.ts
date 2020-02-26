import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-profil',
  templateUrl: './club-profil.page.html',
  styleUrls: ['./club-profil.page.scss'],
})
export class ClubProfilPage implements OnInit {

  public idClub = null;
  public tabClub = [];

  constructor(
    public Http: HttpClient,
    public formBuilder: FormBuilder,
    public tc: ToastController,
    public modalCtrll: ModalController,
    public storage: Storage,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('id_club').then((val) => {
      this.idClub = val;
    });
    this.idClub = 1;
    if (this.idClub == null) {
      this.router.navigate([''])
    } else {
      this.getPlayerInfo(this.idClub);
    }
  }

  public getPlayerInfo(idClub): void {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id.php?idClub=" + idClub)
    data.subscribe(result => {
      this.tabClub = result[0];
      console.log(result);
    })
  }

}