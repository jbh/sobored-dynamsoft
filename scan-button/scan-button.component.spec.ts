import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanButtonComponent } from './scan-button.component';

describe('ScanButtonComponent', () => {
  let component: ScanButtonComponent;
  let fixture: ComponentFixture<ScanButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
