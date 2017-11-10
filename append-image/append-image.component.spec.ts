import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendImageComponent } from './append-image.component';

describe('ContainerComponent', () => {
  let component: AppendImageComponent;
  let fixture: ComponentFixture<AppendImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
