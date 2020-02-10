import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
export interface Data {
  movies: string;
}
@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.page.html',
  styleUrls: ['./search-player.page.scss'],
})
export class SearchPlayerPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  public tabPlayer = [];
  public values = {};

  constructor(public Http: HttpClient, private formBuilder: FormBuilder) {
    this.columns = [
    { name: 'Name' },
    { name: 'Poste' },
    { name: 'Strong' },
    { name: 'Level' }
  ];
}

  ngOnInit() {

  }
  ionViewWillEnter() {
  }


  public getPlayerInfo(country, poste, foot, level): void {
    let data: Observable<any>;
    // tslint:disable-next-line:max-line-length
    data = this.Http.get('https://nicolasfabing.fr/ionic/search_player.php?birth_country=' + country + '&poste=' + poste + '&strong=' + foot + '&level=' + level)
    data.subscribe(result => {
      this.tabPlayer = result;
      console.log(this.tabPlayer);
      this.rows = this.tabPlayer;
    });
    document.getElementById('res').style.display = 'block';
  }

  registrationForm = this.formBuilder.group({
    sport_type: ['', [Validators.required, Validators.maxLength(50)]],
    current_country: ['', [Validators.required, Validators.maxLength(50)]],
    nationality: ['', [Validators.required, Validators.maxLength(50)]],
    post: ['', [Validators.required, Validators.maxLength(50)]],
    cote: ['', [Validators.required, Validators.maxLength(50)]],
    level: ['', [Validators.required, Validators.maxLength(50)]],
  });

  get sport_type() {
    return this.registrationForm.get('sport_type');
  }
  get current_country() {
    return this.registrationForm.get('current_country');
  }
  get nationality() {
    return this.registrationForm.get('nationality');
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
    current_country: [
      { type: 'required', message: 'Le pays est requis' },
      { type: 'maxlength', message: 'Le pays ne peut dépasser 50 caractères' }
    ],
    nationality: [
      { type: 'required', message: 'La nationalité est requise' },
      { type: 'maxlength', message: 'La nationalité ne peut dépasser 50 caractères' }
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
    this.getPlayerInfo(this.registrationForm.get('current_country').value, this.registrationForm.get('post').value, this.registrationForm.get('cote').value, this.registrationForm.get('level').value);
  }

}
