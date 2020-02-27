import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {GlobalService} from '../global.service';

@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.page.html',
    styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {


    public favorites: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];

    constructor(private httpClient: HttpClient, private router: Router, private storage: Storage, private globalService: GlobalService) {
    }

    ngOnInit() {
    }

     ionViewWillEnter() {
        this.fetchData();
    }

    fetchData() {
        this.httpClient.get<any>(`https://nicolasfabing.fr/ionic/list_favorites.php?id=${this.globalService.idUser}`)
            .subscribe(favorite => {
                this.favorites = favorite;

            });
    }


    goToPageDetails(id: number) {
        this.router.navigate(['offre-details', id]);
    }


}
