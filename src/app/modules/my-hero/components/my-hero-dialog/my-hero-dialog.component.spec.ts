import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeroDialogComponent } from './my-hero-dialog.component';

describe('MyHeroDialogComponent', () => {
  let component: MyHeroDialogComponent;
  let fixture: ComponentFixture<MyHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeroDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
