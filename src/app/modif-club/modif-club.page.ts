import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modif-club',
  templateUrl: './modif-club.page.html',
  styleUrls: ['./modif-club.page.scss'],
})
export class ModifClubPage implements OnInit {

  public idClub = "";
  public tabClub = [];
  public imgClub = "";
  public file = null;
  public img_new = null;



  constructor(
    public Http: HttpClient,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router,
    private activitedRoute: ActivatedRoute,
    private tc: ToastController) { }


  ngOnInit() {
    
    this.storage.set('id_club', 2);
  }

  async ionViewWillEnter() {
    await this.storage.get('id_club').then((val) => {
      this.idClub = val;
      if (this.idClub != null) {
        this.getClubInfo(this.idClub);
      } else {
        this.router.navigate(['']);
      }
    });
  }



  async getClubInfo(id) {
    let data: Observable<any>;
    data = this.Http.get("https://nicolasfabing.fr/ionic/club_profil_by_id_for_cv?idClub=" + id)
    data.subscribe(result => {
      this.tabClub = result[0];
      //Recupere l'image du user
      if (this.tabClub['img'] == "clubDefault.jpg") {
        this.imgClub = "https://nicolasfabing.fr/ionic/imagesClub/clubDefault.jpg";
      } else {
        this.imgClub = "https://nicolasfabing.fr/ionic/imagesClub/" + id + ".jpg";
      }
    })

  }

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: [''],
    file: [''],
    objectifs: [''],
    email: ['']
  });

  get name() {
    return this.registrationForm.get("name");
  }
  get description() {
    return this.registrationForm.get("description");
  }
  get objectifs() {
    return this.registrationForm.get("objectifs");
  }
  get email() {
    return this.registrationForm.get("email");
  }

  private fileReader(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const blobFile = new Blob([reader.result], { type: file.type });
      formData.append("file", blobFile, "filename");
      let data: Observable<any>;
      data = this.Http.post("https://nicolasfabing.fr/ionic/upload_image.php", formData)
      data.subscribe(result => {
      })
    };
    reader.readAsArrayBuffer(file);
  }

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
    formData.append('id', this.idClub);
    formData.append('name', this.registrationForm.get('name').value);
    formData.append('description', this.registrationForm.get('description').value);
    formData.append('objective', this.registrationForm.get('objectifs').value);
    formData.append('email', this.registrationForm.get('email').value);
    formData.append('img', '1');



    this.Http.post<any>("https://nicolasfabing.fr/ionic/update_club_profil.php", formData).subscribe(res => {
      setTimeout(() => this.getClubInfo(this.idClub), 1000);
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
