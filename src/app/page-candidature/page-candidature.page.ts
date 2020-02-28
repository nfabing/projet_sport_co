import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-page-candidature',
  templateUrl: './page-candidature.page.html',
  styleUrls: ['./page-candidature.page.scss'],
})
export class PageCandidaturePage implements OnInit {

  public tabHttp: any=[];
  public RemoveHttp;
  public idUser=null;
  public idClub=null;

  public applications: Array<{
    id_offer:number;poste:string;birth_place:string;birth_country:string;name:string;first_name:string;img:string;weight:string;size:string;id:number;state:number
  }> = [];

  constructor(public http:HttpClient,public router:Router,private storage:Storage,public activatedRoute: ActivatedRoute, public toastCtrll: ToastController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.idUser = await this.storage.get('id_user');
    this.idClub = await this.storage.get('id_club');
    console.log(this.idUser);
    console.log(this.idClub);
 
    if(this.idClub === 0 && this.idUser !== 0){
      //il sagit d'un player 
      this.goToCandidaturePlayer();
      } 
      if(this.idClub !== 0 && this.idUser === 0){
      //il sagit d'un club
      this.getListApplicationsClub(this.idClub);
      } 
    
  }

  public goToCandidaturePlayer():void{
    this.router.navigate(['candidature']);
  }

  public getListApplicationsClub(id_club){
    let data: Observable<any>;
    data = this.http.get('https://nicolasfabing.fr/ionic/applicationsByClub?id='+ id_club);
    data.subscribe( result =>{
      this.tabHttp = result;
      this.applications = this.tabHttp;
      console.log(this.applications);
  })}

  accepter(appli){
    console.log("accepter offer "+appli.id_offer+" player id: "+appli.id);
    //let data: Observable <any>;
    let data: Observable<any>;
    data = this.http.get('https://nicolasfabing.fr/ionic/update_candidature?offer='+appli.id_offer+'&player='+appli.id);
    data.subscribe(res => {
      console.log(res);
      this.showToast(res);
      this.getListApplicationsClub(this.idClub);
    })
  }
  
  rejeter(appli){
    // console.log("rejeter"+appli.id_offer+" player id: "+appli.id);
    let data: Observable<any>;
    data = this.http.get('https://nicolasfabing.fr/ionic/remove_application?offer='+appli.id_offer+'&player='+appli.id);
    data.subscribe(res => {
      console.log(res);
      this.showToast(res);
      this.getListApplicationsClub(this.idClub);
    })
  }

  async showToast(msg){
    const toast = await this.toastCtrll.create({
      message: msg,
      duration: 1500,
      position: "bottom"
    });
    toast.present();
  }

}
