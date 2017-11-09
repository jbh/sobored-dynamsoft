import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludePagesComponent } from './exclude-pages.component';

describe('ContainerComponent', () => {
  let component: ExcludePagesComponent;
  let fixture: ComponentFixture<ExcludePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcludePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcludePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
