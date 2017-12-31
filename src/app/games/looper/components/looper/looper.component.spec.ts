import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LooperComponent } from './looper.component';

describe('LooperComponent', () => {
  let component: LooperComponent;
  let fixture: ComponentFixture<LooperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LooperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LooperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
