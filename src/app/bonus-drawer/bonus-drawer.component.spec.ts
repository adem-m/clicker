import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusDrawerComponent } from './bonus-drawer.component';

describe('BonusDrawerComponent', () => {
  let component: BonusDrawerComponent;
  let fixture: ComponentFixture<BonusDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
