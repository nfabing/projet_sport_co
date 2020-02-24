import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
export interface Data {
  movies: string;
}
@Component({
  selector: 'app-search-club',
  templateUrl: './search-club.page.html',
  styleUrls: ['./search-club.page.scss'],
})
export class SearchClubPage implements OnInit {
  public tabOffer = [];

  constructor(public Http: HttpClient, private formBuilder: FormBuilder, private storage: Storage) {
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
  }


  public getClubInfo(country, poste, foot, level, club): void {
    this.storage.get('country').then((pays) => {
      if (country !== '') {
        country = pays;
      }
      this.storage.get('poste').then((post) => {
        if (poste !== '') {
          poste = post;
        }
        this.storage.get('foot').then((pied) => {
          if (foot !== '') {
            foot = pied;
          }
          this.storage.get('level').then((niveau) => {
            if (level !== '') {
              level = niveau;
            }
            this.storage.get('name').then((clubf) => {
              if (club !== '') {
                club = clubf;
              }
              let data: Observable<any>;
              // tslint:disable-next-line:max-line-length
              data = this.Http.get('https://nicolasfabing.fr/ionic/search_club.php?country=' + country + '&poste=' + poste + '&strong=' + foot + '&level=' + level + '&name=' + club)
              data.subscribe(result => {
                this.tabOffer = result;
                console.log(this.tabOffer);
              });
            });
          });
        });
      });
    });
  }


  registrationForm = this.formBuilder.group({
    sport_type: ['', [Validators.required, Validators.maxLength(50)]],
    country: ['', [Validators.required, Validators.maxLength(50)]],
    club: ['', [Validators.required, Validators.maxLength(50)]],
    post: ['', [Validators.required, Validators.maxLength(50)]],
    cote: ['', [Validators.required, Validators.maxLength(50)]],
    level: ['', [Validators.required, Validators.maxLength(50)]],
  });

  get sport_type() {
    return this.registrationForm.get('sport_type');
  }
  get country() {
    return this.registrationForm.get('country');
  }
  get club() {
    return this.registrationForm.get('club');
  }
  get post() {
    return this.registrationForm.get('post');
  }
  get cote() {
    return this.registrationForm.get('cote');
  }
  get level() {
    return this.registrationForm.get('level');
  }

  public errorMessages = {
    sport_type: [
      { type: 'required', message: 'Le type de sport est requis' },
      { type: 'maxlength', message: 'Le type de sport ne peut dépasser 50 caractères' }
    ],
    country: [
      { type: 'required', message: 'Le pays est requis' },
      { type: 'maxlength', message: 'Le pays ne peut dépasser 50 caractères' }
    ],
    club: [
      { type: 'required', message: 'La club est requise' },
      { type: 'maxlength', message: 'La club ne peut dépasser 50 caractères' }
    ],
    post: [
      { type: 'required', message: 'Le poste est requis' },
      { type: 'maxlength', message: 'Le poste ne peut dépasser 50 caractères' }
    ],
    cote: [
      { type: 'required', message: 'La cote est requise' },
      { type: 'maxlength', message: 'La cote ne peut dépasser 50 caractères' }
    ],
    level: [
      { type: 'required', message: 'Le niveau est requis' },
      { type: 'maxlength', message: 'Le niveau ne peut dépasser 50 caractères' }
    ],
  };

  public submit() {

    // tslint:disable-next-line:max-line-length
    this.storage.set('country', this.registrationForm.get('country').value);
    this.storage.set('poste', this.registrationForm.get('post').value);
    this.storage.set('foot', this.registrationForm.get('cote').value);
    this.storage.set('level', this.registrationForm.get('level').value);
    this.storage.set('name', this.registrationForm.get('club').value);
    //this.getClubInfo(this.registrationForm.get('country').value, this.registrationForm.get('post').value, this.registrationForm.get('cote').value, this.registrationForm.get('level').value, this.registrationForm.get('club').value);
  }

}
