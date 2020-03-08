import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Storage} from '@ionic/storage';
import {GlobalService} from '../global.service';
import {add} from 'ionicons/icons';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

    // Récupérer l'idendifiant du club actuellement connectée en utilisant -> this.globalService.idClub
    // Effectué dans sumbit() lorsque je recup toutes les donneés à envoyer

    // TODO : lorsque l'on supprimer ou modifie une offre il faut d'abord vérifier que l'offre existe
    //  ET que l'offre appartient au club connectée !

    /*Une meilleure version serait d'afficher directement les offres du club qui est connectée dans une liste par exemple,
         L'utilisateur pourrait alors cliquée sur une offre de la liste , ce qui triger l'évenement (click) avec l'id de l'offre
         et ensuite on récupère les infos de l'offre */
    // Une liste des offres du club connecté est maintenant affiché au dessus du formulaire

    // Il ne faut pas vérifier toutes les 250ms si on est en train de modif, supprimer ou ajouter une offre.
    //  Utilise l'évenement (click) sur les inputs dans ton html qui renvoie vers une function dans ton tab2.page.ts
    // Utilisation de click sur les boutons radio pour lancer la fonction UpdateDisplay()

    // Tu récupère la liste des posts, alors utilise là dans ton html pour créer ton select !
    //  Utilise *ngFor , tu peux regarder dans les pages des autres tel que club-search-results ou applications
    // Je garde les postes manuels car plus compréhensibles que des acronymes, mais je réutlise la liste des postes
    // pour afficher les postes de chaque offre du club

    // La vérifcations des champs devrait se faire au click du boutton sumbit pour ne pas avoir besoin de vérif toutes les 250ms
    //  Une meilleure alternative serait d'utiliser directement le Form Validation(https://www.w3schools.com/angular/angular_validation.asp)
    // Lancement de la fonction de validation dans sumbit() et affichage d'une alerte indiquant
    // qu'il manque des champs si la validation échoue

    // TODO : Utilisation de HttpParams pour crée ton postData, ça sera beaucoup, beaucoup plus simple
    //  https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/#

    // Ta page s'affichera uniquement dans le menu quand tu est connectée en tant que club
    //  Identifiants de connexions : email  : sr-creutzwald@gmail.com  |  Mot de passe : azertyuiop
    // Si l'on tente d'acceder à cette page sans être connecté, on est renvoyé au login de club

    // TODO : ESSAYE DE FAIRE UN MAX, IL FAUT AU MINIMUM QUE TU ADAPTE TA REQUETE SELON LE CLUB QUI EST CONNECTEE !!


export class Tab2Page {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public HttpClient: HttpClient, private formBuilder: FormBuilder, private storage: Storage,
                private globalService: GlobalService, private router: Router,  private toastController: ToastController) {

    }

    get desc() {
        return this.offerForm.get('desc');
    }

    get niveau() {
        return this.offerForm.get('niveau');
    }

    get poste() {
        return this.offerForm.get('poste');
    }

    get pays() {
        return this.offerForm.get('pays');
    }

    get pied() {
        return this.offerForm.get('pied');
    }

    get disponibilite() {
        return this.offerForm.get('disponibilite');
    }

    get nationalite() {
        return this.offerForm.get('nationalite');
    }
    get statut() {
        return this.offerForm.get('statut');
    }

    public postes = [];
    public pieds = [];
    public offres = [];
    offerForm = this.formBuilder.group({
        idoffre: [''],
        desc: [''],
        niveau: [''],
        poste: [''],
        pied: [''],
        pays: [''],
        disponibilite: [''],
        nationalite: [''],
        statut: ['']
    });

    public errorMsgs =
        {
            desc: [{type: 'required', message: 'la description est requise'}],
            niveau: [{type: 'required', message: 'veuillez specifier un niveau'}],
            poste: [{type: 'required', message: 'veuillez preciser le poste du joueur'}],
            pied: [{type: 'required', message: 'veuillez preciser le pied dominant du joueur'}],
            pays: [{type: 'required', message: 'veuillez indiquer le pays dans lequel le joueur joue'}],
            disponibilite: [{type: 'required', message: 'veuillez saisir la disponibilité du joueur'}],
            nationalite: [{type: 'required', message: 'veuillez indiquer la nationalité du joueur'}],
            statut: [{type: 'required', message: 'veuillez indiquer le statut du joueur'}]
        };


    ionViewWillEnter() {
        const userid = this.globalService.idUser;
        if (userid === 0) {
         this.router.navigate(['login_club']);
        }
        const addinput = document.getElementById('addoffer') as HTMLInputElement;
        addinput.checked = true;
        document.getElementById('idoffre').style.display = 'none';
        this.getPostes();
        this.getPieds();
        this.getOffres();
    }

    public getOffres(): void {
        let offre: Observable<any>;
        offre = this.HttpClient.get('https://nicolasfabing.fr/ionic/offer_by_id_club.php?idClub=' + this.globalService.idClub);
        offre.subscribe(res => {
           this.offres = res;
        });
    }

    public getPostes(): void {
        let poste: Observable<any>;
        poste = this.HttpClient.get('https://nicolasfabing.fr/ionic/list_postes.php');
        poste.subscribe(res => {
            this.postes = res;
        });
    }

    public getPieds(): void {
        let pied: Observable<any>;
        pied = this.HttpClient.get('https://nicolasfabing.fr/ionic/list_foot.php');
        pied.subscribe(res => {
            this.pieds = res;
        });
    }

    public submit() {
        const updateinput = document.getElementById('updateoffer') as HTMLInputElement;
        const deleteinput = document.getElementById('deleteoffer') as HTMLInputElement;
        const addinput = document.getElementById('addoffer') as HTMLInputElement;
        console.log(this.offerForm.value);
        // tslint:disable-next-line:variable-name
        const id_offre = this.offerForm.value.idoffre;
        let desc = this.offerForm.value.desc;
        const niveau = this.offerForm.value.niveau;
        const poste = this.offerForm.value.poste;
        const pied = this.offerForm.value.pied;
        const pays = this.offerForm.value.pays;
        const disponibilite = this.offerForm.value.disponibilite;
        const nationalite = this.offerForm.value.nationalite;
        const status = this.offerForm.value.statut;
        // tslint:disable-next-line:variable-name
        const id_club = this.globalService.idClub;
        desc = desc.replace(/ /g, '_');
        console.log(desc);
        if (this.CheckForValidation() === true) {
        if (deleteinput.checked === true) {
            console.log('suppression');

            const postData = new HttpParams()
                .set('id_offre', id_offre.toString());

            const url = 'https://nicolasfabing.fr/ionic/delete_offre.php';
            let values: Observable<any>;
            values = this.HttpClient.post(url, postData);
            values.subscribe(res => {
                this.showToast(res);
            });
        } else if (updateinput.checked === true) {
            console.log('modification');


            const postData = new HttpParams()
                .set('desc', desc.toString())
                .set('niveau', niveau.toString())
                .set('poste', poste.toString())
                .set('pied', pied.toString())
                .set('pays', pays.toString())
                .set('disponibilite', disponibilite.toString())
                .set('nationalite', nationalite.toString())
                .set('id_club', id_club.toString())
                .set('id_offre', id_offre.toString())
                .set('status', status.toString());


            const url = 'https://nicolasfabing.fr/ionic/update_offre.php';
            let values: Observable<any>;
            values = this.HttpClient.post(url, postData);
            values.subscribe(res => {
                this.showToast(res);
            });
        } else if (addinput.checked === true) {
            console.log('ajout');

            const postData = new HttpParams()
                .set('desc', desc.toString())
                .set('niveau', niveau.toString())
                .set('poste', poste.toString())
                .set('pied', pied.toString())
                .set('pays', pays.toString())
                .set('disponibilite', disponibilite.toString())
                .set('nationalite', nationalite.toString())
                .set('id_club', id_club.toString())
                .set('status', status.toString());


            // tslint:disable-next-line:max-line-length
            const url = 'https://nicolasfabing.fr/ionic/insert_offre.php';
            // tslint:disable-next-line:max-line-length
            let values: Observable<any>;
            values = this.HttpClient.post(url, postData);
            values.subscribe(res => {
                this.showToast(res);
            });
        }
        } else {
            alert('Il manque des champs');
        }
    }
    public CheckForValidation() {
        // tslint:disable-next-line:variable-name
        const id_offre = document.getElementById('input_idoffre') as HTMLInputElement;
        const disponibilite = document.getElementById('input_disponibilite') as HTMLInputElement;
        const nationalite = document.getElementById('input_nationalite') as HTMLInputElement;
        const poste = document.getElementById('input_poste') as HTMLInputElement;
        const pays = document.getElementById('input_pays') as HTMLInputElement;
        const desc = document.getElementById('input_desc') as HTMLInputElement;
        const niveau = document.getElementById('input_niveau') as HTMLInputElement;
        const status = document.getElementById('input_status') as HTMLInputElement;
        const updateinput = document.getElementById('updateoffer') as HTMLInputElement;
        const deleteinput = document.getElementById('deleteoffer') as HTMLInputElement;
        const addinput = document.getElementById('addoffer') as HTMLInputElement;
        const submitbutton = document.getElementById('submitbutton') as HTMLInputElement;

        console.log('Delete' + deleteinput.checked);
        console.log('Add' + addinput.checked);
        console.log('Update' + updateinput.checked);
      // console.log(nationalite.value);
        if (deleteinput.checked === true) {
            if (id_offre.value === '') {
            return false;
            } else {
            return true;
            }
        } else if (updateinput.checked === true) {
            // tslint:disable-next-line:max-line-length
            if (id_offre.value === '' || disponibilite.value === '' || nationalite.value === '' || pays.value === '' || desc.value === '' || niveau.value === '' || poste.value === '' || status.value === '') {
                return false;
            } else {
                return true;
            }
        } else if (addinput.checked === true) {
            // tslint:disable-next-line:max-line-length
            if (disponibilite.value === '' || nationalite.value === '' || pays.value === '' || desc.value === '' || niveau.value === '' || poste.value === '' || status.value === '') {
                return false;
            } else {
                console.log('dispo' + disponibilite.value );
                console.log('natio' + nationalite.value );
                console.log('pays' + pays.value );
                console.log('desc' + desc.value );
                console.log('niveau' + niveau.value );
                console.log('poste' + poste.value );
                console.log('status' + status.value );
                return true;
            }
        }
        }

    async showToast(msg): Promise<void> {
        const toast = await this.toastController.create({
            message: msg,
            color: 'dark',
            duration: 2000
        });
        await toast.present();
    }
    public UpdateDisplay() {
        const updateinput = document.getElementById('updateoffer') as HTMLInputElement;
        const deleteinput = document.getElementById('deleteoffer') as HTMLInputElement;
        const addinput = document.getElementById('addoffer') as HTMLInputElement;
        if (deleteinput.checked === true) {
            document.getElementById('offerform').style.display = 'none';
            addinput.checked = false;
            updateinput.checked = false;
            document.getElementById('idoffre').style.display = 'block';
        } else if (updateinput.checked === true) {
            document.getElementById('offerform').style.display = 'block';
            addinput.checked = false;
            deleteinput.checked = false;
            document.getElementById('idoffre').style.display = 'block';
        } else if (addinput.checked === true) {
            document.getElementById('offerform').style.display = 'block';
            updateinput.checked = false;
            deleteinput.checked = false;
            document.getElementById('idoffre').style.display = 'none';
        }
    }
}

