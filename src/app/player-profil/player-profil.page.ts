import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-player-profil',
  templateUrl: './player-profil.page.html',
  styleUrls: ['./player-profil.page.scss'],
})
export class PlayerProfilPage implements OnInit {

  public tabPlayer = [];
  public values = {};
  public idUser = "";
  public file = null;
  public img_new = null;
  public imgUser = null;
  public typeUser = false;

  constructor(
    public Http: HttpClient,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router,
    private activitedRoute: ActivatedRoute,
    private tc: ToastController) { }

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

  private fileReader(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const blobFile = new Blob([reader.result], { type: file.type });
      console.log(blobFile);
      console.log(blobFile);
      console.log(blobFile);
      console.log(blobFile);
      formData.append("file", blobFile, "filename");
      let data: Observable<any>;
      data = this.Http.post("https://nicolasfabing.fr/ionic/upload_image.php", formData)
      data.subscribe(result => {
      })
    };
    reader.readAsArrayBuffer(file);
  }

  async getPlayerInfo(id) {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/player_profil.php?idPlayer=" + id)
    data.subscribe(result => {
      this.tabPlayer = result[0];
      //Recupere l'image du user
      if (this.tabPlayer['img'] == "user.jpg") {
        this.imgUser = "https://nicolasfabing.fr/ionic/imagesUsers/user.jpg";
      } else {
        this.imgUser = "https://nicolasfabing.fr/ionic/imagesUsers/" + id + ".jpg";
      }

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
    password: [''],
    file: ['']
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
      { type: 'pattern', message: 'Veuillez entrer un email valide' }
    ]

  };

  changeListener($event): void {
    if ($event.target.files.length > 0) {
      this.registrationForm.get('file').setValue($event.target.files[0]);
      this.file = $event.target.files[0];
      let reader = new FileReader();
      reader.onload = ($event: any) => {
        this.img_new = $event.target.result;
      }
      reader.readAsDataURL($event.target.files[0]);
      let oldImg = document.getElementById('oldImg');
      oldImg.innerHTML = "";
    }
  }

  public submit() {
    const formData = new FormData();
    formData.append('file', this.registrationForm.get('file').value);
    formData.append('id', this.idUser);
    formData.append('name', this.registrationForm.get('name').value);
    formData.append('first_name', this.registrationForm.get('first_name').value);
    formData.append('email', this.registrationForm.get('email').value);
    formData.append('password', this.registrationForm.get('password').value)
    formData.append('img', "1")



    this.Http.post<any>("https://nicolasfabing.fr/ionic/update_player_profil.php", formData).subscribe(res => {
      setTimeout(() => this.getPlayerInfo(this.idUser), 1000);
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
