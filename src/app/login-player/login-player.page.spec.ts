import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPlayerPage } from './login-player.page';

describe('LoginPlayerPage', () => {
  let component: LoginPlayerPage;
  let fixture: ComponentFixture<LoginPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
