import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchOfferPage } from './search-offer.page';

describe('SearchOfferPage', () => {
  let component: SearchOfferPage;
  let fixture: ComponentFixture<SearchOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOfferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
