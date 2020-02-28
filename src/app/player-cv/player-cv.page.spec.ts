import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerCvPage } from './player-cv.page';

describe('PlayerCvPage', () => {
  let component: PlayerCvPage;
  let fixture: ComponentFixture<PlayerCvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
