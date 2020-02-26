import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.page.html',
    styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {

    private idPlayer: number;
    public applications: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];

    constructor(private httpClient: HttpClient, private router: Router, private storage: Storage) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        await this.storage.get('id_user').then(value => this.idPlayer = value);
        this.fetchData();
    }

    fetchData() {

        this.httpClient.get<any>(`https://nicolasfabing.fr/ionic/list_applications.php?id=${this.idPlayer}`)
            .subscribe(application => {
                this.applications = application;

            });
    }


    goToPageDetails(id: number) {
        this.router.navigate(['offre-details', id]);
    }

}
