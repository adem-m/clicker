import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuropeDialogComponent } from './europe-dialog.component';

describe('EuropeDialogComponent', () => {
  let component: EuropeDialogComponent;
  let fixture: ComponentFixture<EuropeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuropeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuropeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
