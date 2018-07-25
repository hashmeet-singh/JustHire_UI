import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureInterviewComponent } from './configure-interview.component';

describe('ConfigureInterviewComponent', () => {
  let component: ConfigureInterviewComponent;
  let fixture: ComponentFixture<ConfigureInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
