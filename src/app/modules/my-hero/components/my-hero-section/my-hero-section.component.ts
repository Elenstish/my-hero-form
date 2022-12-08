import { Component, Input, OnInit } from '@angular/core';

import { MyHeroList } from "../../models/my-hero-interface.model";

@Component({
  selector: 'app-my-hero-section',
  templateUrl: './my-hero-section.component.html',
  styleUrls: ['./my-hero-section.component.scss']
})
export class MyHeroSectionComponent implements OnInit {
  @Input()
  public section: MyHeroList;
  public toggleIcon: string = 'arrow_right';

  public ngOnInit(): void {
    this.toggleIcon = this.section.isExpanded ? 'arrow_drop_down' : 'arrow_right';
  }

  public onPanelStateChanged(isOpened: boolean): void {
    this.toggleIcon = isOpened ? 'arrow_drop_down' : 'arrow_right';
  }
}
