import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPlayerCvPage } from './modal-player-cv.page';

describe('ModalPlayerCvPage', () => {
  let component: ModalPlayerCvPage;
  let fixture: ComponentFixture<ModalPlayerCvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlayerCvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPlayerCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
