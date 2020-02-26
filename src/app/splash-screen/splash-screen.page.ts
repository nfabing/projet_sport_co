import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-splash-screen',
    templateUrl: './splash-screen.page.html',
    styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

    public id_user: any;
    public id_club: any;

    constructor(private router: Router, private storage: Storage) {
    }

    progress(idplayer, idclub) {
        console.log(idplayer + ' ' + idclub);

        if (idplayer === null || idplayer === '' || idplayer === false || !idplayer) {
            idplayer = '0';
            this.storage.set('id_user', '0');
        } else if (idclub === null || idclub === '' || idclub === false || !idclub) {
            idclub = '0';
            this.storage.set('id_club', '0');
        }

        if (idplayer === '0' && idclub === '0') {
            //si l'utilisateur ne s'est jamais connecté
            this.router.navigate(['login-register']);
        } else if (idplayer === '0' && idclub !== '0') {
            //si l'utilisateur est un club
            this.router.navigate(['fil-actu']);
        } else if (idplayer !== '0' && idclub === '0') {
            //si l'utilisateur est un joueur
            this.router.navigate(['fil-actu']);
        } else if (idclub !== '0' && idplayer !== '0') {
            //si l'utilisateur est connecté en tant que club est joueur on réinitilise cette valeur a la connection
            this.router.navigate(['login-register']);
        } else {
          //si l'utilisateur ne s'est jamais connecté et que les tests n'ont pas fonctionner
            this.router.navigate(['login-register']);
        }
    }
// on utilise async/await pour que l'application n'éxecute pas le reste du code le temps qu'on n'a pas nos ID
    async ionViewWillEnter() {
        this.id_user = await this.storage.get('id_user');
        this.id_club = await this.storage.get('id_club');
        this.progress(this.id_user.toString(), this.id_club.toString());
    }

    ngOnInit() {
    }

}
