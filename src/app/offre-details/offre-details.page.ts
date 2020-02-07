import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-offre-details',
    templateUrl: './offre-details.page.html',
    styleUrls: ['./offre-details.page.scss'],
})
export class OffreDetailsPage implements OnInit {


    constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {

        console.log(this.activatedRoute.snapshot.paramMap.get('id'));

    }

    ngOnInit() {
    }


}
