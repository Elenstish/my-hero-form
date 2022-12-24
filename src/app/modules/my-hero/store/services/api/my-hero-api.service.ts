import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";

import { MyHeroId, MyHeroNode } from "../../../models/my-hero-interface.model";
import { MyHeroList } from "../../../constants/my-hero-list-temp.constants";


@Injectable({
  providedIn: 'root'
})
export class MyHeroApiService {
  public myHeroItem: MyHeroNode;
  private newMyHeroList: MyHeroNode[] = [];

  constructor(
      public httpClient: HttpClient
  ) {}

  public createMyHero(payload: MyHeroNode): Observable<MyHeroId> {
    this.myHeroItem = payload;
    const myHeroId: MyHeroId = {
      id: '1'
    };
    return of(myHeroId).pipe(delay(500));
    // const url: string = ('/my-hero');
    // return this.httpClient.post<MyHeroId>(url, payload, {
    //   headers: new HttpHeaders({ 'ignore-error-notifications': 'yes' })
    // });
  }

  public getMyHeroList(): Observable<MyHeroNode[]> {
    this.newMyHeroList = this.myHeroItem ? [ ...this.newMyHeroList, this.myHeroItem] : [ ...MyHeroList ];

    return of(this.newMyHeroList).pipe(delay(500));
  }
}
