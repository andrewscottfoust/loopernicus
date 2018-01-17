import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopShareComponent } from './loop-share.component';

describe('LoopShareComponent', () => {
  let component: LoopShareComponent;
  let fixture: ComponentFixture<LoopShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
