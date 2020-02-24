import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.page.html',
  styleUrls: ['./candidature.page.scss'],
})
export class CandidaturePage implements OnInit {

  public tabHttp: any=[];

public applications: Array<{
  id_offer:number;poste:string;description:string;name:string;img:string
}> = [];

  constructor(public http:HttpClient,public router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getListApplications(1);
  }

  public goToCandidature(id):void{
    this.router.navigate(['page-candidature', id]);
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
