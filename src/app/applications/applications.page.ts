import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {GlobalService} from '../global.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.page.html',
    styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {


    public applications: Array<{ id: number; name: string; img: string; poste: string; availability: string }> = [];

    constructor(private httpClient: HttpClient, private router: Router, private storage: Storage, private globalService: GlobalService) {
    }

    ngOnInit() {
    }

     ionViewWillEnter() {
        this.fetchData();
    }

    fetchData() {

        this.httpClient.get<any>(`https://nicolasfabing.fr/ionic/list_applications.php?id=${this.globalService.idUser}`)
            .subscribe(application => {
                this.applications = application;

            });
    }


    goToPageDetails(id: number) {
        this.router.navigate(['offre-details', id]);
    }

}
