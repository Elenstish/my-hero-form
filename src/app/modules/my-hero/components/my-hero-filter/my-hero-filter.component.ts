import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-hero-filter',
  templateUrl: './my-hero-filter.component.html',
  styleUrls: ['./my-hero-filter.component.css']
})
export class MyHeroFilterComponent {
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
}
