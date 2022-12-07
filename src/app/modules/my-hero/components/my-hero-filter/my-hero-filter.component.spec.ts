import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeroFilterComponent } from './my-hero-filter.component';

describe('MyHeroFilterComponent', () => {
  let component: MyHeroFilterComponent;
  let fixture: ComponentFixture<MyHeroFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeroFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
