import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-offre-search-results',
    templateUrl: './offre-search-results.page.html',
    styleUrls: ['./offre-search-results.page.scss'],
})
export class OffreSearchResultsPage implements OnInit {

    public offers: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];

    constructor(private httpClient: HttpClient, private router: Router) {

        this.httpClient.get<any>('https://nicolasfabing.fr/ionic/offers_results.php')
            .subscribe(offer => {
                this.offers = offer;

            });

    }

    ngOnInit() {
    }

    ionViewWillEnter() {

    }


    goToPageDetails(id: number) {
        this.router.navigate(['offre-details', id ]);
    }


}
