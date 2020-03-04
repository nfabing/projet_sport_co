import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { ModalPlayerCvPage } from '../modal-player-cv/modal-player-cv.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-cv',
  templateUrl: './player-cv.page.html',
  styleUrls: ['./player-cv.page.scss'],
})
export class PlayerCvPage implements OnInit {

  public tabPlayer = [];
  public postes = [];
  public strongs = [];
  public values = {};
  public toast: any;
  public idUser = '';


  constructor(
    public Http: HttpClient,
    public formBuilder: FormBuilder,
    public tc: ToastController,
    public modalCtrll: ModalController,
    public alertCtrll: AlertController,
    public storage: Storage,
    public router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.get('id_user').then((val) => {
      this.idUser = val;
      if (this.idUser != null) {
        this.getPlayerInfo(this.idUser);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async presentModal() {
    const modal: HTMLIonModalElement =
      await this.modalCtrll.create({
        component: ModalPlayerCvPage,
        componentProps: {
          'postes': this.postes,
          'id_player': this.tabPlayer['id']
        }
      })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data['dismissed'] == true) {
      this.getPlayerInfo(this.idUser);
    }
  }

  async alertSuppressionClub(id_club_player) {
    const alert = await this.alertCtrll.create({
      header: 'Supprimer',
      message: 'Êtes-vous sûr de supprimer ce club ?',
      buttons: [{
        text: "Annuler"
      },
      {
        text: "Supprimer",
        handler: () => {
          let postData = new FormData();
          postData.append("id_player_clubs", id_club_player);
          let test: Observable<any>;
          test = this.Http.post("https://nicolasfabing.fr/ionic/delete_player_clubs.php", postData)
          test.subscribe(res => {
            this.showToast(res);
            this.getPlayerInfo(this.idUser);
          });
        }
      }
      ]
    });

    await alert.present();
  }


  public getPlayerInfo(idPlayer): void {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/player_profil.php?idPlayer=" + idPlayer)
    data.subscribe(result => {
      this.tabPlayer = result[0];
      let footUserId = this.tabPlayer['id_foot'];
      let positionUserId = this.tabPlayer['id_position'];
      //Recupere le bon pied du joueur
      let footUser: Observable<any>;
      footUser = this.Http.get("https://nicolasfabing.fr/ionic/foot_by_id.php?idFoot=" + footUserId);
      footUser.subscribe(res => {
        this.tabPlayer['foot'] = res[0];
      })
      let posUser: Observable<any>;
      posUser = this.Http.get("https://nicolasfabing.fr/ionic/position_by_id.php?idPosition=" + positionUserId);
      posUser.subscribe(res => {
        this.tabPlayer['position'] = res[0];
      })
      //Recupere l'id du club du joueur
      let getClubId: Observable<any>;
      getClubId = this.Http.get("https://nicolasfabing.fr/ionic/player_club_by_id_player.php?idPlayer=" + idPlayer);
      getClubId.subscribe(resClub => {
        this.tabPlayer['historique_des_clubs'] = resClub;
        for (let i = 0; i < this.tabPlayer['historique_des_clubs']['length']; i++) {
          let season = resClub[i]['season_start'] + "/" + resClub[i]['season_end'];
          let position = resClub[i]['id_position'];
          //id de la table player_clubs sert pour la suppression
          let id_club_player = resClub[i]['id'];
          //Recupere les infos du club
          let idClub = this.tabPlayer['historique_des_clubs'][i]['id_club'];
          let clubUser: Observable<any>;
          clubUser = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id.php?idClub=" + idClub);
          clubUser.subscribe(resultat => {
            this.tabPlayer['historique_des_clubs'][i] = resultat[0];
            this.tabPlayer['historique_des_clubs'][i]['season'] = season;
            //id de la table player_clubs sert pour la suppression
            this.tabPlayer['historique_des_clubs'][i]['id_club_player'] = id_club_player;
            //Permet de recuperer le poste qu'occupait le joueur dans ce club
            for (let z = 0; z < this.postes.length; z++) {
              if (this.postes[z]['id'] == position) {
                this.tabPlayer['historique_des_clubs'][i]['position'] = this.postes[z]['poste'];
              }
            }
          })
        }
      })


      //Recupere le palmares du joueur
      let getPalmares: Observable<any>;
      getPalmares = this.Http.get("https://nicolasfabing.fr/ionic/palmares_by_id_player.php?idPlayer=" + idPlayer);
      getPalmares.subscribe(res => {
        this.tabPlayer['palmares'] = res;
        for (let i = 0; i < this.tabPlayer['palmares']['length']; i++) {
          let season = res[i]['season_start'] + "/" + res[i]['season_end'];
          let idChamp = res[i]['id_championship'];
          let idClub = res[i]['id_club'];

          let champ: Observable<any>;
          champ = this.Http.get("https://nicolasfabing.fr/ionic/championship_by_id.php?idChamp=" + idChamp);
          champ.subscribe(resultat => {
            let champName = resultat[0]['nom']
            this.tabPlayer['palmares'][i]['championship'] = "" + champName;
          })

          let clubUser: Observable<any>;
          clubUser = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id.php?idClub=" + idClub);
          clubUser.subscribe(resultat => {
            this.tabPlayer['palmares'][i] = resultat[0];
            this.tabPlayer['palmares'][i]['season'] = season;

          })
        }
      })
    });

    let poste: Observable<any>;
    poste = this.Http.get("https://nicolasfabing.fr/ionic/list_postes.php")
    poste.subscribe(res => {
      this.postes = res;
    });


    let strong: Observable<any>;
    strong = this.Http.get("https://nicolasfabing.fr/ionic/list_foot.php")
    strong.subscribe(res => {
      this.strongs = res;
    })

  }

  registrationForm = this.formBuilder.group({
    birth_date: ['', [Validators.required]],
    birth_place: ['', [Validators.required, Validators.maxLength(50)]],
    birth_country: ['', [Validators.required, Validators.maxLength(50)]],
    weight: ['', [Validators.required]],
    size: ['', [Validators.required]],
    strong: ['', [Validators.required]],
    poste: ['', [Validators.required]],
  });

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
  get strong() {
    return this.registrationForm.get('strong');
  }
  get poste() {
    return this.registrationForm.get('poste');
  }

  public errorMessages = {
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
    strong: [
      { type: 'required', message: 'Le bon pied est requis' },
    ],
    poste: [
      { type: 'required', message: 'Le poste est requis' },
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

    let birth_date = this.registrationForm.get('birth_date').value;
    let birth_place = this.registrationForm.get('birth_place').value;
    let birth_country = this.registrationForm.get('birth_country').value;
    let weight = this.registrationForm.get('weight').value;
    let size = this.registrationForm.get('size').value;
    let id_foot = this.registrationForm.get('strong').value;
    let id_position = this.registrationForm.get('poste').value;
    let id_player = this.tabPlayer['id'];


    if (id_foot == null) {
      id_foot = this.tabPlayer['id_foot']
    }
    if (id_position == null) {
      id_position = this.tabPlayer['id_position']
    }


    let postData = new FormData();
    postData.append("birth_date", birth_date);
    postData.append("birth_place", birth_place);
    postData.append("birth_country", birth_country);
    postData.append("weight", weight);
    postData.append("size", size);
    postData.append("id_foot", id_foot);
    postData.append("id_position", id_position);
    postData.append("id_player", id_player);

    let test: Observable<any>;
    test = this.Http.post("https://nicolasfabing.fr/ionic/update_player_cv.php", postData)
    test.subscribe(res => {
      this.showToast(res);
    })

  }
  async showToast(msg) {
    const toast = await this.tc.create({
      message: msg,
      duration: 1500,
      position: "bottom",
      animated: true,
      cssClass: "toast-succes",
    });
    toast.present();
  }

}
