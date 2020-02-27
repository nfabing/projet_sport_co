import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.page.html',
  styleUrls: ['./candidature.page.scss'],
})
export class CandidaturePage implements OnInit {

  public tabHttp: any=[];
  public idUser=null;
  public idClub=null;

public applications: Array<{
  id_offer:number;poste:string;description:string;name:string;img:string
}> = [];

  constructor(public http:HttpClient,public router:Router,private storage: Storage) { }

  ngOnInit() {
  }

  
 async ionViewWillEnter(){
    this.idUser = await this.storage.get('id_user');
    this.idClub = await this.storage.get('id_club');
    console.log(this.idUser);
    console.log(this.idClub);
 
    if(this.idClub === 0 && this.idUser !== 0){
      //il sagit d'un player 
      this.getListApplications(this.idUser);
      } 
      if(this.idClub !== 0 && this.idUser === 0){
      //il sagit d'un club
      this.goToCandidatureClub();
      } 
    
  }


  public goToCandidatureClub():void{
    this.router.navigate(['page-candidature']);
  }

  public getListApplications(id_player):void
  {
    let data: Observable<any>;
    data = this.http.get('https://nicolasfabing.fr/ionic/applicationsByPlayer?id='+ id_player);
    data.subscribe( result =>{
      this.tabHttp = result;
      this.applications = this.tabHttp;
      console.log(this.applications);
    })
  }

}
