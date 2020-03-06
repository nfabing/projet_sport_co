import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifClubPage } from './modif-club.page';

describe('ModifClubPage', () => {
  let component: ModifClubPage;
  let fixture: ComponentFixture<ModifClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
