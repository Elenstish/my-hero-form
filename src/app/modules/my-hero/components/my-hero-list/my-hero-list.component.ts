import { Component } from '@angular/core';
import { Observable, Subject } from "rxjs";

import {MyHeroList, MyHeroNode} from "../../models/my-hero-interface.model";
import {MyHeroStoreService} from "../../services/my-hero-store.service";

@Component({
  selector: 'app-my-hero-list',
  templateUrl: './my-hero-list.component.html',
  styleUrls: ['./my-hero-list.component.css']
})
export class MyHeroListComponent {
  public isLoading$: Observable<boolean>;
  public search: string = '';
  public myHeroGroupList$: Observable<MyHeroList[]>;

  private myHeroList$: Observable<MyHeroNode[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
      private myHeroStoreService: MyHeroStoreService
  ) { }

  public ngOnInit(): void {
    this.myHeroStoreService.getMyHeroList();
    this.subscribeStatuses();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSearchChanged(searchValue: string): void {
    this.search = searchValue;
  }

  private subscribeStatuses(): void {}
}
