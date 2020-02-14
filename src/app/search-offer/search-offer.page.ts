import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
export interface Data {
  movies: string;
}
@Component({
  selector: 'app-search-offer',
  templateUrl: './search-offer.page.html',
  styleUrls: ['./search-offer.page.scss'],
})
export class SearchOfferPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  public tabOffer = [];
  public values = {};

  constructor(public Http: HttpClient, private formBuilder: FormBuilder, private storage: Storage) {
    this.columns = [
      { name: 'Name' },
      { name: 'Poste' },
      { name: 'Strong' },
      { name: 'Level' },
      { name: 'Division' }
    ];
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
  }


  public getOfferInfo(country, poste, foot, level, division): void {
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
            this.storage.get('division').then((divis) => {
              if (division !== '') {
                division = divis;
              }
              let data: Observable<any>;
              // tslint:disable-next-line:max-line-length
              data = this.Http.get('https://nicolasfabing.fr/ionic/search_offer.php?country=' + country + '&poste=' + poste + '&strong=' + foot + '&level=' + level + '&nom=' + division)
              data.subscribe(result => {
                this.tabOffer = result;
                console.log(this.tabOffer);
                this.rows = this.tabOffer;
              });
              document.getElementById('res').style.display = 'block';
            });
          });
        });
      });
    });
  }


  registrationForm = this.formBuilder.group({
    sport_type: ['', [Validators.required, Validators.maxLength(50)]],
    country: ['', [Validators.required, Validators.maxLength(50)]],
    division: ['', [Validators.required, Validators.maxLength(50)]],
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
  get division() {
    return this.registrationForm.get('division');
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
    division: [
      { type: 'required', message: 'La division est requise' },
      { type: 'maxlength', message: 'La division ne peut dépasser 50 caractères' }
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
    this.storage.set('post', this.registrationForm.get('post').value);
    this.storage.set('foot', this.registrationForm.get('cote').value);
    this.storage.set('level', this.registrationForm.get('level').value);
    this.storage.set('division', this.registrationForm.get('division').value);
    //this.getOfferInfo(this.registrationForm.get('country').value, this.registrationForm.get('post').value, this.registrationForm.get('cote').value, this.registrationForm.get('level').value, this.registrationForm.get('division').value);
  }

}
