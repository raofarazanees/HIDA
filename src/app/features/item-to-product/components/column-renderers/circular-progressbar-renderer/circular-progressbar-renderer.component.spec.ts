import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CircularProgressbarRendererComponent } from './circular-progressbar-renderer.component';

describe('CircularProgressbarRendererComponent', () => {
  let component: CircularProgressbarRendererComponent;
  let fixture: ComponentFixture<CircularProgressbarRendererComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularProgressbarRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularProgressbarRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
