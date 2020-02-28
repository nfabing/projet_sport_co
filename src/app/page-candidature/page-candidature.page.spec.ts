import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageCandidaturePage } from './page-candidature.page';

describe('PageCandidaturePage', () => {
  let component: PageCandidaturePage;
  let fixture: ComponentFixture<PageCandidaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCandidaturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageCandidaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
