import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest,} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-offre-details',
    templateUrl: './offre-details.page.html',
    styleUrls: ['./offre-details.page.scss'],
})
export class OffreDetailsPage implements OnInit {

    private idOffer: number;
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

        this.idOffer = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        console.log(this.idOffer);
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.fetchOfferDetails();
    }

    fetchOfferDetails() {

        this.httpClient.get<any>('https://nicolasfabing.fr/ionic/offer_details.php?id=' + this.idOffer)
            .subscribe(offer => {
                this.offers = offer;
            });
    }


    addApplication() {
        let postData = new HttpParams()
            .set('player' , '1')
            .set('offer', this.idOffer.toString());

        this.httpClient.post('https://nicolasfabing.fr/ionic/add_application.php', postData)
            .subscribe(data => {
                console.log(data)

            }, error => {
                console.log(error)
            })

    }

    addFavorite() {

        let postData = new HttpParams()
            .set('player', '1')
            .set('offer', this.idOffer.toString());


        this.httpClient.post('https://nicolasfabing.fr/ionic/add_fav.php', postData)
            .subscribe(data => {
                console.log(data)

            }, error => {
                console.log(error)
            })
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
