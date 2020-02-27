import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public HttpClient: HttpClient, private formBuilder: FormBuilder, private storage: Storage) {
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

    public postes = [];
    public pieds = [];
    offerForm = this.formBuilder.group({
        idoffre: [''],
        desc: [''],
        niveau: [''],
        poste: [''],
        pied: [''],
        pays: [''],
        disponibilite: [''],
        nationalite: ['']
    });

    public errorMsgs =
        {
            desc: [{type: 'required', message: 'la description est requise'}],
            niveau: [{type: 'required', message: 'veuillez specifier un niveau'}],
            poste: [{type: 'required', message: 'veuillez preciser le poste du joueur'}],
            pied: [{type: 'required', message: 'veuillez preciser le pied dominant du joueur'}],
            pays: [{type: 'required', message: 'veuillez indiquer le pays dans lequel le joueur joue'}],
            disponibilite: [{type: 'required', message: 'veuillez saisir la disponibilité du joueur'}],
            nationalite: [{type: 'required', message: 'veuillez indiquer la nationalité du joueur'}]
        };


    ionViewWillEnter() {
        const addinput = document.getElementById('addoffer') as HTMLInputElement;
        addinput.checked = true;
        document.getElementById('idoffre').style.display = 'none';
        this.storage.get('id_club').then((val) => {
            // this.id_club = val;
        });
        setInterval(this.UpdateDisplay, 250);
        this.getPostes();
        this.getPieds();
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
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            })
        };
        console.log(this.offerForm.value);
        const idoffre = this.offerForm.value.idoffre;
        let desc = this.offerForm.value.desc;
        const niveau = this.offerForm.value.niveau;
        const poste = this.offerForm.value.poste;
        const pied = this.offerForm.value.pied;
        const pays = this.offerForm.value.pays;
        const disponibilite = this.offerForm.value.disponibilite;
        const nationalite = this.offerForm.value.nationalite;
        // tslint:disable-next-line:variable-name
        const id_club = 1;
        desc = desc.replace(/ /g, '_');
        console.log(desc);
        if (deleteinput.checked === true) {
            console.log('suppression');
            const url = 'https://nicolasfabing.fr/ionic/delete_offre.php/?id_offre=' + idoffre;
        } else if (updateinput.checked === true) {
            console.log('modification');
            // tslint:disable-next-line:max-line-length
            const url = 'https://nicolasfabing.fr/ionic/update_offre.php/?desc=' + desc + '&niveau=' + niveau + '&poste=' + poste + '&pied=' + pied + '&pays=' + pays + '&disponibilite=' + disponibilite + '&nationalite=' + nationalite + '&id_club=' + id_club + '&id_offre=' + idoffre;
        } else if (addinput.checked === true) {
            console.log('ajout');
            // tslint:disable-next-line:max-line-length
            const url = 'https://nicolasfabing.fr/ionic/insert_offre.php/?desc=' + desc + '&niveau=' + niveau + '&poste=' + poste + '&pied=' + pied + '&pays=' + pays + '&disponibilite=' + disponibilite + '&nationalite=' + nationalite + '&id_club=' + id_club;
        // tslint:disable-next-line:max-line-length
            let values: Observable<any>;
            values = this.HttpClient.post(url, httpOptions);
            values.subscribe(res => {
            return alert('offre ajoutée');
        });
    }

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
