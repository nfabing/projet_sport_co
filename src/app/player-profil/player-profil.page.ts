import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-player-profil',
  templateUrl: './player-profil.page.html',
  styleUrls: ['./player-profil.page.scss'],
})
export class PlayerProfilPage implements OnInit {

  public tabPlayer = [];

  constructor(public Http: HttpClient) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    console.log('Init');
    this.getPlayerInfo(107);
  }

  public getPlayerInfo(id):void
  {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/player_profil.php?idPlayer="+id)
    data.subscribe(result => {
      this.tabPlayer = result[0];
      console.log(this.tabPlayer);
    })
  }


}
