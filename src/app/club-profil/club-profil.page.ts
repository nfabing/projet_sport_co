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
  public imgClub = "";

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

  async ionViewWillEnter() {
    await this.storage.get('id_club').then((val) => {
      this.idClub = val;
      if (this.idClub == null) {
        this.router.navigate([''])
      } else {
        this.getPlayerInfo(this.idClub);
      }
    });
  }

  public getPlayerInfo(idClub) {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id.php?idClub=" + idClub)
    data.subscribe(result => {
      this.tabClub = result[0];
      //Recupere l'image du user
      if (this.tabClub['img'] == "clubDefault.jpg") {
        this.imgClub = "https://nicolasfabing.fr/ionic/imagesClub/clubDefault.jpg";
      } else {
        this.imgClub = "https://nicolasfabing.fr/ionic/imagesClub/" + this.idClub + ".jpg";
      }
    })
  }

  public redirectToOffer(id): void
  {
    this.router.navigate(['offre-details', id]);
  }

}
