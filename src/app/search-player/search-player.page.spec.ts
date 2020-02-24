import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPlayerPage } from './search-player.page';

describe('SearchPlayerPage', () => {
  let component: SearchPlayerPage;
  let fixture: ComponentFixture<SearchPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
