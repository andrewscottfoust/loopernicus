import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LooperHeaderComponent } from './looper-header.component';

describe('LooperHeaderComponent', () => {
  let component: LooperHeaderComponent;
  let fixture: ComponentFixture<LooperHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LooperHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LooperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
