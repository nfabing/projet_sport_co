import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-recherche-club',
  templateUrl: './recherche-club.page.html',
  styleUrls: ['./recherche-club.page.scss'],
})
export class RechercheClubPage implements OnInit {

  public idClub = "";
  public tabClub = [];

  constructor(public Http: HttpClient, public activitedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.idClub = this.activitedRoute.snapshot.paramMap.get('id_club');
    if(this.idClub == "" || this.idClub == null){
      this.router.navigate(['']);
    }
    this.getClubInfo(this.idClub);
  }

  public getClubInfo(id): void {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id.php?idClub=" + id);
    data.subscribe(result => {
      console.log(result);
      this.tabClub = result[0];
    })
  }

  public redirectToOffer(id): void
  {
    this.router.navigate(['offre-details', id]);
  }

}
