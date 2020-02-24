import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerProfilPage } from './player-profil.page';

describe('PlayerProfilPage', () => {
  let component: PlayerProfilPage;
  let fixture: ComponentFixture<PlayerProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
