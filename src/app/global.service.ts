import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    // tslint:disable-next-line:variable-name
    private _idUser = 0;
    // tslint:disable-next-line:variable-name
    private _idClub = 0;

    constructor(private storage: Storage) {
         storage.get('id_user').then((value => this._idUser = value));
         storage.get('id_club').then((value => this._idClub = value));
    }


    get idUser(): number {
        return this._idUser;
    }

    set idUser(value: number) {
        this._idUser = value;
    }

    get idClub(): number {
        return this._idClub;
    }

    set idClub(value: number) {
        this._idClub = value;
    }
}
