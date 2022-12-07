import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeroListComponent } from './my-hero-list.component';

describe('MyHeroListComponent', () => {
  let component: MyHeroListComponent;
  let fixture: ComponentFixture<MyHeroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeroListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
