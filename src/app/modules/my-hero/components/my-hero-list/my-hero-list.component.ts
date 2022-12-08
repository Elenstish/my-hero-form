import { Component } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { filter, map, take } from "rxjs/operators";

import { MyHeroList, MyHeroNode } from "../../models/my-hero-interface.model";
import { MyHeroStoreService } from "../../services/my-hero-store.service";

@Component({
  selector: 'app-my-hero-list',
  templateUrl: './my-hero-list.component.html',
  styleUrls: ['./my-hero-list.component.scss']
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

  private subscribeStatuses(): void {
    this.isLoading$ = this.myHeroStoreService.getMyHeroListProgress$();
    this.myHeroList$ = this.myHeroStoreService.selectMyHeroList$();
    this.myHeroGroupList$ = this.geMyHeroGroupList(this.myHeroList$);
    this.myHeroStoreService.createMyHeroSuccessAction$()
        .pipe(
            filter(Boolean),
            take(1)
        )
        .subscribe(() => this.myHeroStoreService.getMyHeroList());
  }

  private geMyHeroGroupList(myHeroList$: Observable<MyHeroNode[]>): Observable<MyHeroList[]> {
    return myHeroList$
      .pipe(
        filter(items => !!(items && items?.length)),
        map((items: MyHeroNode[]) => {
            let groups = items.map(item => item.groupName);
            groups = [...new Set(groups)];
            const components = [];
            groups.forEach(group => {
                components.push(items.filter(item => item.groupName === group));
            });
            components[0].isExpanded = true;

            return components;
        })
      );
  }
}
