import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-offre-search-results',
    templateUrl: './offre-search-results.page.html',
    styleUrls: ['./offre-search-results.page.scss'],
})
export class OffreSearchResultsPage implements OnInit {

    public offers: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];
    private baseURI = 'https://nicolasfabing.fr/ionic/';
    private criterias: Array<any> = [];

    constructor(private httpClient: HttpClient, private router: Router, private storage: Storage) {}

    ngOnInit() {}

    async ionViewWillEnter() {

        // Données pour test
        /*await this.storage.set('country', 'france');
        await this.storage.set('post', '');
        await this.storage.set('foot', '');
        await this.storage.set('level', '');
        await this.storage.set('division', '');*/

        await this.getSearchCriteria();
        await this.getOffers();

    }

    getOffers() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        this.httpClient.get<any>(`${this.baseURI}offers_results.php?country=${this.criterias.country}&poste=${this.criterias.post}&strong=${this.criterias.foot}&level=${this.criterias.level}&nom=${this.criterias.division}`)
            .subscribe(offer => {
                this.offers = offer;
            });

    }

    async getSearchCriteria() {
        await this.storage.forEach((value, key) => {
            if (key !== 'id_club' && key !== 'id_user') {
                this.criterias[key] = value;
                this.storage.remove(key);
            }
        });
    }

    goToPageDetails(id: number) {
        this.router.navigate(['offre-details', id]);
    }


}
