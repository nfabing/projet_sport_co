import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';

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
    private idPlayer: number;
    public offers: Array<{
        id: number; club_name: string; offer_description: string; poste: string; foot: string; availability: string;
        championnat: string; nationality: string; country: string; img_club: string
    }> = [];


    constructor(public httpClient: HttpClient, private activatedRoute: ActivatedRoute,
                public alertController: AlertController, public toastController: ToastController) {

        this.idPlayer = 1;
        this.idOffer = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.fetchDataGet();
        this.checkIfFavorite();
        this.checkIfApplied();
    }

    checkIfApplied(): void {
        // tslint:disable-next-line:max-line-length
        this.httpClient.get<any>(`${this.baseURI}check_application.php?player=${this.idPlayer}&offer=${this.idOffer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isApplied = data.body;
                {
                    this.isApplied ? (this.textButton = 'Supprimez votre candidature' , this.colorButton = 'danger')
                        : (this.textButton = 'Envoyer votre candidature' , this.colorButton = 'primary');
                }
            });
    }

    checkIfFavorite(): void {
        this.httpClient.get<any>(`${this.baseURI}check_favorite.php?player=${this.idPlayer}&offer=${this.idOffer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isFavorite = data.body;
                {
                    this.isFavorite ? (this.imgFavorite = 'assets/img/heartFull.png') : (this.imgFavorite = 'assets/img/heartEmpty.png');
                }

            });
    }

    fetchDataGet(): void {
        this.httpClient.get<any>(this.baseURI + `offer_details.php?id= ${this.idOffer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.offers = data.body;

            });
    }

    handleClickFavorite(): void {

        if (this.imgFavorite === 'assets/img/heartEmpty.png') {
            const postData = new HttpParams()
                .set('player', String(this.idPlayer))
                .set('offer', this.idOffer.toString());

            this.httpClient.post<any>('https://nicolasfabing.fr/ionic/add_fav.php', postData, {observe: 'response'})
                .subscribe(data => {
                    console.log(data.status);
                    this.isFavorite = true;
                    this.imgFavorite = 'assets/img/heartFull.png';
                    this.showToast('Candidature ajoutée à vos favoris !');
                });
        }

        if (this.imgFavorite === 'assets/img/heartFull.png') {

            this.httpClient.delete(`${this.baseURI}remove_fav.php?offer=${this.idOffer}&player=${this.idPlayer}`, {observe: 'response'})
                .subscribe(data => {
                    console.log(data.status);
                    this.isFavorite = false;
                    this.imgFavorite = 'assets/img/heartEmpty.png';
                    this.showToast('Candidature retirée de vos favoris !');
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
            .set('player', String(this.idPlayer))
            .set('offer', this.idOffer.toString());

        this.httpClient.post('https://nicolasfabing.fr/ionic/add_application.php', postData, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isApplied = true;
                this.textButton = 'Supprimez votre candidature';
                this.colorButton = 'danger';
                this.showToast('Candidature envoyée !');
            });
    }


    removeApplication() {
        this.httpClient.delete(`${this.baseURI}remove_application.php?offer=${this.idOffer}&player=${this.idPlayer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isApplied = false;
                this.textButton = 'Envoyer votre candidature';
                this.colorButton = 'primary';
                this.showToast('Candidature retirée !');
            });
    }

}


