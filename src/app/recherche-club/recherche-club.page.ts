import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-recherche-club',
  templateUrl: './recherche-club.page.html',
  styleUrls: ['./recherche-club.page.scss'],
})
export class RechercheClubPage implements OnInit {

  public idClub = "";
  public tabClub = [];
  public displayBtnWhenGoodClub = false;
  public idClubStorage = "";
  public imgClub = "";



  constructor(public Http: HttpClient, public activitedRoute: ActivatedRoute, public router: Router, public storage: Storage) { }

  ngOnInit() {
  }


  async ionViewWillEnter() {
    this.idClub = this.activitedRoute.snapshot.paramMap.get('id_club');
    this.storage.get("id_club").then((val) => {
      this.idClubStorage = val;
      if (this.idClubStorage == this.idClub) {
        this.displayBtnWhenGoodClub = true;
      }
    })
    
    if (this.idClub == "" || this.idClub == null) {
      this.router.navigate(['']);
    }
    this.getClubInfo(this.idClub);
  }

  public getClubInfo(id): void {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id.php?idClub=" + id);
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

  public redirectToOffer(id): void {
    this.router.navigate(['offre-details', id]);
  }

  public redirectToClubProfil(): void
  {
    this.router.navigate(["modif-club"]);
  }
}
