import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    navigateMainStart: any;
    navigateMainEnd: any;
    navigateUser: any;
    navigateClub: any;
    idUser: number;
    idClub: number;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.storage.get('id_user').then((value => this.idUser = value));
            this.storage.get('id_club').then((value => this.idClub = value));
            this.sideMenu();
        });
    }

    sideMenu() {

        this.navigateMainStart =
            [
                {
                    title: 'Fil d\'actualités',
                    url: '/fil-actu',
                    icon: 'newspaper-outline'
                },
            ];

        this.navigateUser =
            [
                {
                    title: 'Recherche club',
                    url: '/search-club',
                    icon: 'cube-outline'
                },
                {
                    title: 'Recherche offre',
                    url: '/search-offer',
                    icon: 'cube-outline'
                },
                {
                    title: 'Favoris',
                    url: '/favoris',
                    icon: 'heart-outline'
                },
                {
                    title: 'Mes candidatures',
                    url: '/applications',
                    icon: 'document-outline'
                },
                {
                    title: 'Mon profil',
                    url: '/',
                    icon: 'person-outline'
                },
            ];


        this.navigateClub = [
            {
                title: 'Recherche joueur',
                url: '/search-player',
                icon: 'cube-outline'
            },
            {
                title: 'Mon Club',
                url: '/',
                icon: 'person-outline'
            }
        ];

        this.navigateMainEnd =
            [
                {
                    title: 'Mentions Légales',
                    url: '/legalnotice',
                    icon: 'document-text-outline'
                },
                {
                    title: 'Déconnexion',
                    url: '/logout',
                    icon: 'log-out-outline'
                }
            ];
    }

}

