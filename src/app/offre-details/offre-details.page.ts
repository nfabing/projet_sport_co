import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-offre-details',
    templateUrl: './offre-details.page.html',
    styleUrls: ['./offre-details.page.scss'],
})
export class OffreDetailsPage implements OnInit {

    private baseURI = 'https://nicolasfabing.fr/ionic/';
    private isFavorite: boolean;
    private isApplied: boolean;
    private idOffer: number;
    private idPlayer: number;
    private offer: object;
    public offers: Array<{
        id: number; club_name: string; offer_description: string; poste: string; foot: string; availability: string;
        championnat: string; nationality: string; country: string; img_club: string
    }> = [];


    constructor(public httpClient: HttpClient, private activatedRoute: ActivatedRoute) {

        /*
        this.offer = new Offer();
        this.offer.ID = 1;
        console.log(this.offer.ID);
        */

        this.idPlayer = 1;
        this.idOffer = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.fetchData(`offer_details.php?id= ${this.idOffer}`);
        this.checkIfFavorite();
        this.checkIfApplied();
    }

    checkIfApplied() {
        // tslint:disable-next-line:max-line-length
        this.httpClient.get<any>(`${this.baseURI}check_application.php?player=${this.idPlayer}&offer=${this.idOffer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isApplied = data.body;
            });
    }

    checkIfFavorite() {
        this.httpClient.get<any>(`${this.baseURI}check_favorite.php?player=${this.idPlayer}&offer=${this.idOffer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isFavorite = data.body;
            });
    }

    fetchData(url) {
        this.httpClient.get<any>(this.baseURI + url, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.offers = data.body;
            });
    }


    addApplication() {
        const postData = new HttpParams()
            .set('player', String(this.idPlayer))
            .set('offer', this.idOffer.toString());

        this.httpClient.post('https://nicolasfabing.fr/ionic/add_application.php', postData, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);

            }, error => {
                console.log(error);
            });

        this.isApplied = true;

    }

    addFavorite() {

        const postData = new HttpParams()
            .set('player', String(this.idPlayer))
            .set('offer', this.idOffer.toString());

        this.httpClient.post<any>('https://nicolasfabing.fr/ionic/add_fav.php', postData, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);

            }, error => {
                console.log(error);
            });

        this.isFavorite = true;
    }


    removeApplication() {
        this.httpClient.delete(`${this.baseURI}remove_application.php?offer=${this.idOffer}&player=${this.idPlayer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isApplied = false;
            });
    }

    removeFavorite() {
        this.httpClient.delete(`${this.baseURI}remove_fav.php?offer=${this.idOffer}&player=${this.idPlayer}`, {observe: 'response'})
            .subscribe(data => {
                console.log(data.status);
                this.isFavorite = false;
            });
    }
}

class Offer {

    // TODO : CREER UN OBJECT DE CETTE CLASSE
    private _ID: number;
    private _CLUBNAME: string;
    private _OFFERDESCRIPTION: string;
    private _POSTE: string;
    private _FOOT: string;
    private _AVAILABILITY: string;
    private _CHAMPIONNAT: string;
    private _NATIONALITY: string;
    private _COUNTRY: string;


    get ID(): number {
        return this._ID;
    }

    set ID(value: number) {
        this._ID = value;
    }

    get CLUBNAME(): string {
        return this._CLUBNAME;
    }

    set CLUBNAME(value: string) {
        this._CLUBNAME = value;
    }

    get OFFERDESCRIPTION(): string {
        return this._OFFERDESCRIPTION;
    }

    set OFFERDESCRIPTION(value: string) {
        this._OFFERDESCRIPTION = value;
    }

    get POSTE(): string {
        return this._POSTE;
    }

    set POSTE(value: string) {
        this._POSTE = value;
    }

    get FOOT(): string {
        return this._FOOT;
    }

    set FOOT(value: string) {
        this._FOOT = value;
    }

    get AVAILABILITY(): string {
        return this._AVAILABILITY;
    }

    set AVAILABILITY(value: string) {
        this._AVAILABILITY = value;
    }

    get CHAMPIONNAT(): string {
        return this._CHAMPIONNAT;
    }

    set CHAMPIONNAT(value: string) {
        this._CHAMPIONNAT = value;
    }

    get NATIONALITY(): string {
        return this._NATIONALITY;
    }

    set NATIONALITY(value: string) {
        this._NATIONALITY = value;
    }

    get COUNTRY(): string {
        return this._COUNTRY;
    }

    set COUNTRY(value: string) {
        this._COUNTRY = value;
    }
}
