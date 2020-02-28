import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechercheProfilPage } from './recherche-profil.page';

describe('RechercheProfilPage', () => {
  let component: RechercheProfilPage;
  let fixture: ComponentFixture<RechercheProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheProfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
