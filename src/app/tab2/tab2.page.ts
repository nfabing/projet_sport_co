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
        setInterval(this.CheckForValidation, 250);
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
        const id_offre = this.offerForm.value.idoffre;
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
            let postData = '';
            postData += '[\n';
            postData += '{\n';
            postData += '"id_offre":"' + id_offre + '"\n';
            postData += '}';
            postData += '\n';
            postData += ']';
            const client = new FormData();
            client.append('jsonClient', postData);
            const url = 'https://nicolasfabing.fr/ionic/delete_offre.php';
            let values: Observable<any>;
            values = this.HttpClient.post(url, client);
            values.subscribe(res => {
                return alert(res);
            });
        } else if (updateinput.checked === true) {
            console.log('modification');
            let postData = '';
            postData += '[\n';
            postData += '{\n';
            postData += '"desc":"' + desc + '"\n,';
            postData += '"niveau":"' + niveau + '"\n,';
            postData += '"poste":"' + poste + '"\n,';
            postData += '"pied":"' + pied + '"\n,';
            postData += '"pays":"' + pays + '"\n,';
            postData += '"disponibilite":"' + disponibilite + '"\n,';
            postData += '"nationalite":"' + nationalite + '"\n,';
            postData += '"id_club":"' + id_club + '"\n,';
            postData += '"id_offre":"' + id_offre + '"\n';
            postData += '}';
            postData += '\n';
            postData += ']';
            const client = new FormData();
            client.append('jsonClient', postData);
            // tslint:disable-next-line:max-line-length
            const url = 'https://nicolasfabing.fr/ionic/update_offre.php';
            let values: Observable<any>;
            values = this.HttpClient.post(url, client);
            values.subscribe(res => {
                return alert(res.json());
            });
        } else if (addinput.checked === true) {
            console.log('ajout');
            let postData = '';
            postData += '[\n';
            postData += '{\n';
            postData += '"desc":"' + desc + '"\n,';
            postData += '"niveau":"' + niveau + '"\n,';
            postData += '"poste":"' + poste + '"\n,';
            postData += '"pied":"' + pied + '"\n,';
            postData += '"pays":"' + pays + '"\n,';
            postData += '"disponibilite":"' + disponibilite + '"\n,';
            postData += '"nationalite":"' + nationalite + '"\n,';
            postData += '"id_club":"' + id_club + '"\n';
            postData += '}';
            postData += '\n';
            postData += ']';
            const client = new FormData();
            client.append('jsonClient', postData);
            // tslint:disable-next-line:max-line-length
            const url = 'https://nicolasfabing.fr/ionic/insert_offre.php';
            // tslint:disable-next-line:max-line-length
            let values: Observable<any>;
            values = this.HttpClient.post(url, client);
            values.subscribe(res => {
                return alert(res);
            });
        }
    }
    public CheckForValidation() {
        const id_offre = document.getElementById('input_idoffre') as HTMLInputElement;
        const disponibilite = document.getElementById('input_disponibilite') as HTMLInputElement;
        const nationalite = document.getElementById('input_nationalite') as HTMLInputElement;
        const poste = document.getElementById('input_poste') as HTMLInputElement;
        const pays = document.getElementById('input_pays') as HTMLInputElement;
        const desc = document.getElementById('input_desc') as HTMLInputElement;
        const niveau = document.getElementById('input_niveau') as HTMLInputElement;
        const updateinput = document.getElementById('updateoffer') as HTMLInputElement;
        const deleteinput = document.getElementById('deleteoffer') as HTMLInputElement;
        const addinput = document.getElementById('addoffer') as HTMLInputElement;
        const submitbutton = document.getElementById('submitbutton') as HTMLInputElement;
        console.log(nationalite.value);
        if (deleteinput.checked === true) {
        if (id_offre.value === '') {
        submitbutton.disabled = true;
        } else {
        submitbutton.disabled = false;
        }
        } else if (updateinput.checked === true) {
            if (id_offre.value === '' || disponibilite.value === '' || nationalite.value === '' || pays.value === '' || desc.value === '' || niveau.value === '' || poste.value === '') {
                submitbutton.disabled = true;
            } else {
                submitbutton.disabled = false;
            }
        } else if (addinput.checked === true) {
            if (disponibilite.value === '' || nationalite.value === '' || pays.value === '' || desc.value === '' || niveau.value === '' || poste.value === '') {
                submitbutton.disabled = true;
            } else {
                submitbutton.disabled = false;
            }
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
