import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginClubPage } from './login-club.page';

describe('LoginClubPage', () => {
  let component: LoginClubPage;
  let fixture: ComponentFixture<LoginClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
