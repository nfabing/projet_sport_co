import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recherche-profil',
  templateUrl: './recherche-profil.page.html',
  styleUrls: ['./recherche-profil.page.scss'],
})
export class RechercheProfilPage implements OnInit {

  public idPlayer = "";
  public tabPlayer = [];

  constructor(public Http: HttpClient, public activitedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
  
  }

  async ionViewWillEnter() {
    this.idPlayer = this.activitedRoute.snapshot.paramMap.get('id_user');
    if(this.idPlayer == "" || this.idPlayer == null){
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
    })
  }

}
