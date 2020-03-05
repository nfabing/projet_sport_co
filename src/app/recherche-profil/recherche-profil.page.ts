import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-recherche-profil',
  templateUrl: './recherche-profil.page.html',
  styleUrls: ['./recherche-profil.page.scss'],
})
export class RechercheProfilPage implements OnInit {

  public idPlayer = "";
  public idPlayerStorage = "";
  public tabPlayer = [];
  public displayBtnWhenGoodUser = false;
  public imgUser = "";

  constructor(public Http: HttpClient, public activitedRoute: ActivatedRoute, public router: Router, public storage: Storage) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter() {
    this.idPlayer = this.activitedRoute.snapshot.paramMap.get('id_user');
    this.storage.get("id_user").then((val) => {
      this.idPlayerStorage = val;
      if (this.idPlayerStorage == this.idPlayer) {
        this.displayBtnWhenGoodUser = true;
      }
    })

    if (this.idPlayer == "" || this.idPlayer == null) {
      this.router.navigate(['']);
    }
    this.getPlayerInfo(this.idPlayer);
  }

  public getPlayerInfo(id): void {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/recherche_profil.php?idPlayer=" + id);
    data.subscribe(result => {
      console.log(result);
      this.tabPlayer = result[0];
      //Recupere l'image du user
      if (this.tabPlayer['img'] == "user.jpg") {
        console.log(this.tabPlayer)
        this.imgUser = "https://nicolasfabing.fr/ionic/imagesUsers/user.jpg";
      } else {
        this.imgUser = "https://nicolasfabing.fr/ionic/imagesUsers/" + id + ".jpg";
      }
    })
  }

  public redirectToPlayerProfil(): void {
    this.router.navigate(['player-profil']);
  }

  public redirectToPlayerCv(): void {
    this.router.navigate(['player-cv']);
  }

}
