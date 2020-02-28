import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClubProfilPage } from './club-profil.page';

describe('ClubProfilPage', () => {
  let component: ClubProfilPage;
  let fixture: ComponentFixture<ClubProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubProfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
