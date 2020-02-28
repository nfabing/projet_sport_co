import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechercheClubPage } from './recherche-club.page';

describe('RechercheClubPage', () => {
  let component: RechercheClubPage;
  let fixture: ComponentFixture<RechercheClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
