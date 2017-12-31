import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleManagerComponent } from './sample-manager.component';

describe('SampleManagerComponent', () => {
  let component: SampleManagerComponent;
  let fixture: ComponentFixture<SampleManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
