import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    navigate: any;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {

        this.sideMenu();
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    sideMenu() {
        this.navigate =
            [
                {
                    title: 'Fil d\'actualités',
                    url: '/fil-actu',
                    icon: 'newspaper-outline'
                },
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
                    title: 'Recherche joueur',
                    url: '/search-player',
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
