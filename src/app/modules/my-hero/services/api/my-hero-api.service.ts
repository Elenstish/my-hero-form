import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {MyHeroId, MyHeroNode} from "../../models/my-hero-interface.model";
import {MyHeroList} from "../../constants/my-hero-list-temp.constants";

@Injectable({
  providedIn: 'root'
})
export class MyHeroApiService {

  constructor(
      public httpClient: HttpClient
  ) {}

  public createMyHero(payload: MyHeroNode): Observable<MyHeroId> {
    const url: string = ('/my-hero');

    return this.httpClient.post<MyHeroId>(url, payload, {
      headers: new HttpHeaders({ 'ignore-error-notifications': 'yes' })
    });
  }

  public getMyHeroList(): Observable<MyHeroNode[]> {
    return of(MyHeroList);
  }
}
