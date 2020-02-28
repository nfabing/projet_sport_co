import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-club-search-results',
  templateUrl: './club-search-results.page.html',
  styleUrls: ['./club-search-results.page.scss'],
})
export class ClubSearchResultsPage implements OnInit {

  private baseURI = 'https://nicolasfabing.fr/ionic/';
  private clubs: Array<{ id: string; name: string; img: string; country: string; postal_code: string; level: string }> = [];
  private criterias: Array<any> = [];


  constructor(private httpClient: HttpClient, private storage: Storage, private router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {

    // Données pour test
    /* await this.storage.set('country', 'germany');
    await this.storage.set('name', '');
    await this.storage.set('poste', '');
    await this.storage.set('level', ''); */

    await this.getSearchCriteria();
    await this.fetchResults();

  }

  async getSearchCriteria() {
    await this.storage.forEach((value, key) => {
      if (key !== 'id_club' && key !== 'id_user') {
        this.criterias[key] = value;
        this.storage.remove(key);
      }

    });
  }



  fetchResults() {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(`${this.baseURI}club_results.php?country=${this.criterias.country}&name=${this.criterias.name}&poste=${this.criterias.poste}&level=${this.criterias.level}`)
        .subscribe(club => {
          // @ts-ignore
          this.clubs = club;
        });
  }


  goToPageDetails(id) {
      this.router.navigate(['recherche-club', id]);
  }
}
