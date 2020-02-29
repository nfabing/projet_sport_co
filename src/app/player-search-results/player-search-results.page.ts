import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-player-search-results',
    templateUrl: './player-search-results.page.html',
    styleUrls: ['./player-search-results.page.scss'],
})
export class PlayerSearchResultsPage implements OnInit {

    private baseURI = 'https://nicolasfabing.fr/ionic/';
    private players: Array<{
        id: number; name: string; first_name: string; birth_date: string; birth_country: string;
        poste: string; strong: string; img: string
    }> = [];
    private criterias: Array<any> = [];

    constructor(private httpClient: HttpClient, private storage: Storage, private router: Router) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {

        // DATA TEST
       /* await this.storage.set('birth_country', 'france');
        await this.storage.set('poste', '');
        await this.storage.set('strong', '');
        await this.storage.set('level', '');*/

        await this.getSearchCriteria();
        this.getOffers();

    }

    getOffers() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        this.httpClient.get<any>(`${this.baseURI}player_results.php?birth_country=${this.criterias.birth_country}&poste=${this.criterias.poste}&strong=${this.criterias.strong}&level=${this.criterias.level}`)
            .subscribe(player => {
              this.players = player;
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
         this.router.navigate(['recherche-profil', id]);
    }

}
