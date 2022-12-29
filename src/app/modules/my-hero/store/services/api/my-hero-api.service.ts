import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";

import { MyHeroName, MyHeroNode } from "../../../models/my-hero-interface.model";
import { MyHeroList } from "../../../constants/my-hero-list-temp.constants";


@Injectable({
  providedIn: 'root'
})
export class MyHeroApiService {
  public myHeroItem: MyHeroNode;
  private newMyHeroList: MyHeroNode[] = [];

  constructor() {}

  public createMyHero(payload: MyHeroNode): Observable<MyHeroName> {
    this.myHeroItem = payload;
    const myHeroName: MyHeroName = {
      name: payload.name
    };
    return of(myHeroName).pipe(delay(500));
  }

  public getMyHeroList(): Observable<MyHeroNode[]> {
    this.newMyHeroList = this.myHeroItem ? [ ...this.newMyHeroList, this.myHeroItem] : [ ...MyHeroList ];

    return of(this.newMyHeroList).pipe(delay(500));
  }
}
