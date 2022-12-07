import { Component, Input } from '@angular/core';

import { MyHeroList } from "../../models/my-hero-interface.model";

@Component({
  selector: 'app-my-hero-section',
  templateUrl: './my-hero-section.component.html',
  styleUrls: ['./my-hero-section.component.css']
})
export class MyHeroSectionComponent {
  @Input() section: MyHeroList;
}
