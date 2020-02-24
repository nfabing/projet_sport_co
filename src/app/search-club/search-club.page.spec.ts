import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchClubPage } from './search-club.page';

describe('SearchClubPage', () => {
  let component: SearchClubPage;
  let fixture: ComponentFixture<SearchClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
