import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-fil-actu',
  templateUrl: './fil-actu.page.html',
  styleUrls: ['./fil-actu.page.scss'],
})
export class FilActuPage implements OnInit {
  public fluxrss: Array<{ id: number; title: string; description: string; img: string}> = [];
  constructor(private menuController: MenuController) { }

  ngOnInit() {}

  ionViewWillEnter() {
      this.menuController.enable(true, 'main');
      this.getRss();
  }


  async getRss()
  {
   const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.matchendirect.fr/rss/info.xml');
   const json = await response.json();
   console.log(json['items']);
   for (let i = 0; i < 10; i++) {
       this.fluxrss.push({
           id: i,
           title: json['items'][i]['title'],
           description: json['items'][i]['description'],
           img: json['items'][i]['enclosure']['link']
       });
   }
   console.log(this.fluxrss);
  }

  logout() {
      console.log('lougout');
  }


}
