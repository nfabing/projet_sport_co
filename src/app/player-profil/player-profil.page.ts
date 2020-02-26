import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-player-profil',
  templateUrl: './player-profil.page.html',
  styleUrls: ['./player-profil.page.scss'],
})
export class PlayerProfilPage implements OnInit {

  public tabPlayer = [];
  public values = {};

  constructor(public Http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getPlayerInfo(1);
  }

  public getPlayerInfo(id): void {
    let data: Observable<any>;
    data = this.Http.get('https://nicolasfabing.fr/ionic/search_player.php?idPlayer=' + id)
    data.subscribe(result => {
      this.tabPlayer = result[0];
      // console.log(this.tabPlayer);
    })
  }

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    first_name: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    birth_date: ['', [Validators.required]],
    birth_place: ['', [Validators.required, Validators.maxLength(50)]],
    birth_country: ['', [Validators.required, Validators.maxLength(50)]],
    weight: ['', [Validators.required]],
    size: ['', [Validators.required]],
  });

  get name() {
    return this.registrationForm.get("name");
  }
  get first_name() {
    return this.registrationForm.get("first_name");
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get birth_date() {
    return this.registrationForm.get('birth_date');
  }
  get birth_place() {
    return this.registrationForm.get('birth_place');
  }
  get birth_country() {
    return this.registrationForm.get('birth_country');
  }
  get weight() {
    return this.registrationForm.get('weight');
  }
  get size() {
    return this.registrationForm.get('size');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Le nom est requis' },
      { type: 'maxlength', message: 'Le nom ne peu dépasser 50 caractères' }
    ],
    first_name: [
      { type: 'required', message: 'Le prénom est requis' },
      { type: 'maxlength', message: 'Le prénom ne peu dépasser 50 caractères' }
    ],
    email: [
      { type: 'required', message: 'L\'email est requise' },
      { type: 'pattern', message: 'Veuillez entrer un email valid' }
    ],
    birth_date: [
      { type: 'required', message: 'La date de naissance est requise' },
    ],
    birth_place: [
      { type: 'required', message: 'La date de naissance est requise' },
      { type: 'maxlength', message: 'Le nom de la commune ne peu dépasser 50 caractères' }
    ],
    birth_country: [
      { type: 'required', message: 'La date de naissance est requise' },
      { type: 'maxlength', message: 'Le nom du pays ne peu dépasser 50 caractères' }
    ],
    weight: [
      { type: 'required', message: 'Le poid est requis' },
    ],
    size: [
      { type: 'required', message: 'La taille est requise' },
    ],
  };

  public submit() {
    //Formate la birth_date au format YYYY-MM-DD 
    let bdUser = this.registrationForm.get('birth_date').value
    bdUser = new Date(bdUser);
    let year = bdUser.getFullYear();
    let month = bdUser.getMonth() + 1;
    let dt = bdUser.getDate();
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    bdUser = year + '-' + month + '-' + dt;
    this.registrationForm.get('birth_date').setValue(bdUser)


    console.log(this.registrationForm.value);
  }

}
