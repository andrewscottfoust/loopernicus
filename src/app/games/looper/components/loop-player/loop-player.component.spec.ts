import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopPlayerComponent } from './loop-player.component';

describe('LoopPlayerComponent', () => {
  let component: LoopPlayerComponent;
  let fixture: ComponentFixture<LoopPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
