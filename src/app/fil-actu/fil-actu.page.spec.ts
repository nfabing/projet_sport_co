import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilActuPage } from './fil-actu.page';

describe('FilActuPage', () => {
  let component: FilActuPage;
  let fixture: ComponentFixture<FilActuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilActuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilActuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
