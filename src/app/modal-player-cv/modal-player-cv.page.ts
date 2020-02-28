import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-player-cv',
  templateUrl: './modal-player-cv.page.html',
  styleUrls: ['./modal-player-cv.page.scss'],
})
export class ModalPlayerCvPage implements OnInit {

  public listPostes = [];
  public listClub = [];
  public listChampionship = [];
  public today = new Date().getFullYear();
  public idPlayer = null;



  constructor(
    public ModalCtrll: ModalController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public http: HttpClient,
    public tc: ToastController
  ) {
    this.listPostes = navParams.get('postes');
    this.idPlayer = navParams.get('id_player');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getInfoForForm();
  }

  public getInfoForForm(): void {
    let club: Observable<any>;
    club = this.http.get("https://nicolasfabing.fr/ionic/list_club.php")
    club.subscribe(res => {
      this.listClub = res;
    })
    let championship: Observable<any>;
    championship = this.http.get("https://nicolasfabing.fr/ionic/list_championship.php")
    championship.subscribe(res => {
      this.listChampionship = res;
    })
  }

  dismiss() {
    this.ModalCtrll.dismiss({
      "dismissed": true
    });
  }

  addClubForm = this.formBuilder.group({
    club: ['', [Validators.required]],
    championship: ['', [Validators.required]],
    position: ['', [Validators.required]],
    season_start: ['', [Validators.required]],
    season_end: ['', [Validators.required]]
  })

  get club() {
    return this.addClubForm.get('club');
  }
  get championship() {
    return this.addClubForm.get('championship');
  }
  get position() {
    return this.addClubForm.get('position');
  }
  get season_start() {
    return this.addClubForm.get('season_start');
  }
  get season_end() {
    return this.addClubForm.get('season_end');
  }

  public errorMessage = {
    club: [
      { type: 'required', message: 'Le club est requis' },
    ],
    championship: [
      { type: 'required', message: 'Le championnat est requis' },
    ],
    position: [
      { type: 'required', message: 'La position est requise' },
    ],
    season_start: [
      { type: 'required', message: 'La saison de debut est requise' },
    ],
    season_end: [
      { type: 'required', message: 'La saison de fin est requise' },
    ],
  }

  public submit() {

    let seasonStart = this.addClubForm.get('season_start').value;
    let seasonEnd = this.addClubForm.get('season_end').value;
    let club = this.addClubForm.get('club').value;
    let championship = this.addClubForm.get('championship').value;
    let poste = this.addClubForm.get('position').value;

    if (club == "") {
      this.showToast('Veuillez choisir un club')
    }else if (championship == "") {
      this.showToast('Veuillez choisir le championnat')
    }else if (poste == "") {
      this.showToast('Veuillez choisir un poste')
    }else if (seasonEnd < seasonStart) {
      this.showToast('La saison de fin est plus ancienne que celle de début')
    }else if (seasonStart == ""){
      this.showToast('Veuillez entrer une saison de début')
    }else if (seasonEnd == "") {
      this.showToast('Veuillez entrer une saison de fin')
    }else{

    //Sépare l'année du reste de la date
    seasonStart = seasonStart.split("-");
    seasonStart = seasonStart[0];
    seasonEnd = seasonEnd.split("-");
    seasonEnd = seasonEnd[0];

    let postData = new FormData();
    postData.append("id_club", club);
    postData.append("id_championship", championship);
    postData.append("id_position", poste);
    postData.append("season_start", seasonStart);
    postData.append("season_end", seasonEnd);
    postData.append("id_player", this.idPlayer);

    let addClubToDb: Observable<any>;
    addClubToDb = this.http.post("https://nicolasfabing.fr/ionic/add_club_to_player.php", postData)
    addClubToDb.subscribe(res => {
      this.showToast(res);
    })

    this.ModalCtrll.dismiss({
      "dismissed": true
    });
    }

    


  }

  async showToast(msg) {
    const toast = await this.tc.create({
      message: msg,
      duration: 2000,
      position: "bottom",
      animated: true,
    });
    toast.present();
  }



}
