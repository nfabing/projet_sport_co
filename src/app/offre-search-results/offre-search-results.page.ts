import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
    selector: 'app-offre-search-results',
    templateUrl: './offre-search-results.page.html',
    styleUrls: ['./offre-search-results.page.scss'],
})
export class OffreSearchResultsPage implements OnInit {

    public offers: Array<{ name: string; img: string; poste: string; availability: string }> = [];

    constructor(private httpClient: HttpClient) {

        this.httpClient.get<any>('https://nicolasfabing.fr/ionic/offers_results.php')
            .subscribe(offer => {
                this.offers = offer;

            });

    }

    ngOnInit() {
    }

    ionViewWillEnter() {

    }


}
