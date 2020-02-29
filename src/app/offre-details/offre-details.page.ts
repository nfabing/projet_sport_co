import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {GlobalService} from '../global.service';

@Component({
    selector: 'app-offre-details',
    templateUrl: './offre-details.page.html',
    styleUrls: ['./offre-details.page.scss'],
})


export class OffreDetailsPage implements OnInit {

    private baseURI = 'https://nicolasfabing.fr/ionic/';
    public imgFavorite: string;
    public textButton: string;
    public colorButton: string;
    private isFavorite: boolean;
    private isApplied: boolean;
    private idOffer: number;
    public state: number;
    public offers: Array<{
        id: number; club_name: string; offer_description: string; poste: string; foot: string; availability: string;
        championnat: string; nationality: string; country: string; img_club: string
    }> = [];


    constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private alertController: AlertController,
                private toastController: ToastController, private storage: Storage, private globalService: GlobalService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.idOffer = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.fetchDataGet();
        if (this.globalService.idUser) {
            this.checkIfFavorite();
            this.checkIfApplied();
        }
    }

    checkIfApplied(): void {
        this.httpClient.get<any>(`${this.baseURI}check_application.php?player=${this.globalService.idUser}&offer=${this.idOffer}`,
            {observe: 'response'})
            .subscribe(data => {

                this.isApplied = data.body;
                { parseInt(data.body.state, 10) ? this.state = parseInt(data.body.state, 10) : this.state = 0; }

                { this.isApplied ? (this.textButton = 'Supprimez votre candidature' , this.colorButton = 'danger')
                        : (this.textButton = 'Envoyer votre candidature' , this.colorButton = 'primary'); }
            });
    }

    checkIfFavorite(): void {
        this.httpClient.get<any>(`${this.baseURI}check_favorite.php?player=${this.globalService.idUser}&offer=${this.idOffer}`,
            {observe: 'response'})
            .subscribe(data => {
                this.isFavorite = data.body;
                {
                    this.isFavorite ? (this.imgFavorite = 'assets/img/heartFull.png') : (this.imgFavorite = 'assets/img/heartEmpty.png');
                }

            });
    }

    fetchDataGet(): void {
        this.httpClient.get<any>(`${this.baseURI}offer_details.php?id=${this.idOffer}`, {observe: 'response'})
            .subscribe(data => {
                this.offers = data.body;

            });
    }

    handleClickFavorite(): void {
        if (this.imgFavorite === 'assets/img/heartEmpty.png') {

            const postData = new HttpParams()
                .set('player', this.globalService.idUser.toString(10))
                .set('offer', this.idOffer.toString(10));

            this.httpClient.post<any>(`${this.baseURI}/add_fav.php`, postData, {observe: 'response'})
                .subscribe(data => {
                    if (data.status === 200) {
                        this.isFavorite = true;
                        this.imgFavorite = 'assets/img/heartFull.png';
                        this.showToast('Candidature ajoutée à vos favoris !');
                    }
                });
        }

        if (this.imgFavorite === 'assets/img/heartFull.png') {

            this.httpClient.delete(`${this.baseURI}remove_fav.php?offer=${this.idOffer}&player=${this.globalService.idUser}`,
                {observe: 'response'})
                .subscribe((data) => {
                    if (data.status === 200) {
                        this.isFavorite = false;
                        this.imgFavorite = 'assets/img/heartEmpty.png';
                        this.showToast('Candidature retirée de vos favoris !');
                    }
                });
        }
    }


    async handleClickApplication(): Promise<void> {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            message: 'Êtes-vous sûr de vouloir ' + (this.isApplied ? 'retirer votre candidature ?' : 'envoyer votre candidature ?'),
            buttons: [{
                text: 'Annuler',
                role: 'cancel',
            }, {
                text: 'Envoyer',
                role: 'accept',
                handler: () => {
                    {
                        this.isApplied ? this.removeApplication() : this.addApplication();
                    }
                }
            }]
        });
        await alert.present();

    }

    async showToast(msg): Promise<void> {
        const toast = await this.toastController.create({
            message: msg,
            color: 'dark',
            duration: 2000
        });
        await toast.present();
    }


    addApplication() {
        const postData = new HttpParams()
            .set('player', this.globalService.idUser.toString(10))
            .set('offer', this.idOffer.toString(10));

        this.httpClient.post(`${this.baseURI}/add_application.php`, postData, {observe: 'response'})
            .subscribe(data => {
               // console.log(data.body);
                this.isApplied = true;
                this.textButton = 'Supprimez votre candidature';
                this.colorButton = 'danger';
                this.showToast('Candidature envoyée !');
            });
    }


    removeApplication() {
        this.httpClient.delete(`${this.baseURI}remove_application.php?offer=${this.idOffer}&player=${this.globalService.idUser}`,
            {observe: 'response'})
            .subscribe(data => {
                if (data.status === 200) {
                    this.isApplied = false;
                    this.textButton = 'Envoyer votre candidature';
                    this.colorButton = 'primary';
                    this.showToast('Candidature retirée !');
                }
            });
    }

}
