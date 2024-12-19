import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModuleLandingPageComponent } from './module-landing-page.component';

describe('ModuleLandingPageComponent', () => {
  let component: ModuleLandingPageComponent;
  let fixture: ComponentFixture<ModuleLandingPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
