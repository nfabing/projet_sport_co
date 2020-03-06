import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {GlobalService} from './global.service';

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
        private globalService: GlobalService,
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

    sideMenuUser() {
        this.navigateUser = [
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
                url: '/candidature',
                icon: 'document-outline'
            },
            {
                title: 'Mon profil',
                url: `/recherche-profil/${this.globalService.idUser}`,
                icon: 'person-outline'
            },
        ];

        return true;
    }

    sideMenuClub() {
        this.navigateClub = [
            {
                title: 'Recherche joueur',
                url: '/search-player',
                icon: 'cube-outline'
            },
            {
                title: 'Candidature reçues',
                url: '/page-candidature',
                icon: 'cube-outline'
            },
            {
                title: 'Mon Club',
                url: `/recherche-club/${this.globalService.idClub}`,
                icon: 'person-outline'
            },
            {
               title: 'Ajout Offre',
               url: `/ajout-offre/${this.globalService.idClub}`,
               icon:  'add-outline'
            }
        ];

        return true;
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

