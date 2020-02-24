import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-page-candidature',
  templateUrl: './page-candidature.page.html',
  styleUrls: ['./page-candidature.page.scss'],
})
export class PageCandidaturePage implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public detailOffre(){
    //this.activatedRoute.snapshot.paramMap.get('id')
    
  }

}
