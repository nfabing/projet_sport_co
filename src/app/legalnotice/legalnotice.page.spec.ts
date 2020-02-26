import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalnoticePage } from './legalnotice.page';

describe('LegalnoticePage', () => {
  let component: LegalnoticePage;
  let fixture: ComponentFixture<LegalnoticePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalnoticePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalnoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
