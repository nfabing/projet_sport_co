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
    data = this.Http.get("https://nicolasfabing.fr/ionic/player_profil.php?idPlayer=" + id)
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
    ]
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
    
  };

  public submit() {
  
    console.log(this.registrationForm.value);
  }

}
