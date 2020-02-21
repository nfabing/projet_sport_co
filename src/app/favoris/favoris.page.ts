import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.page.html',
    styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

    public favorites: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];

    constructor(private httpClient: HttpClient, private router: Router, storage: Storage) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.fetchData();
    }

    fetchData() {
        const userID = 1;
        // storage.get('id_user');
        // TODO changer la requete avec l'id récupérer
        this.httpClient.get<any>(`https://nicolasfabing.fr/ionic/list_favorites.php?id=${userID}`)
            .subscribe(favorite => {
                this.favorites = favorite;

            });
    }


    goToPageDetails(id: number) {
        this.router.navigate(['offre-details', id]);
    }


}
