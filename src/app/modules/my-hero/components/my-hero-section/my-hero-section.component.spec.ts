import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeroSectionComponent } from './my-hero-section.component';

describe('MyHeroSectionComponent', () => {
  let component: MyHeroSectionComponent;
  let fixture: ComponentFixture<MyHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeroSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
