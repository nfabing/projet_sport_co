import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private storage: Storage) {}
ionViewWillEnter() {
    this.storage.get('id_user').then((val) => {
      console.log(val);
    });
    this.storage.get('id_club').then((val) => {
      console.log(val);
    });
}

}
