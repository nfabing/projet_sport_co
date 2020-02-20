import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {

  public applications: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.fetchData();
  }

  fetchData() {
    const userID = 1;
    // storage.get('id_user');
    // TODO changer la requete avec l'id récupérer
    this.httpClient.get<any>(`https://nicolasfabing.fr/ionic/list_applications.php?id=${userID}`)
        .subscribe(application => {
          this.applications = application;

        });
  }


  goToPageDetails(id: number) {
    this.router.navigate(['offre-details', id]);
  }

}
