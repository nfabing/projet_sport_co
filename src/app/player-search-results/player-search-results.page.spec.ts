import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerSearchResultsPage } from './player-search-results.page';

describe('PlayerSearchResultsPage', () => {
  let component: PlayerSearchResultsPage;
  let fixture: ComponentFixture<PlayerSearchResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSearchResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSearchResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
