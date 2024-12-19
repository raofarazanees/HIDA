import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommentRendererComponent } from './comment-renderer.component';

describe('CommentRendererComponent', () => {
  let component: CommentRendererComponent;
  let fixture: ComponentFixture<CommentRendererComponent>;

  const agParam = {
    data: {
      reclassifyCustomerComments: 'test'
    },
    commentField: 'reclassifyCustomerComments'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentRendererComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agInit method should update the initial values', () => {
    component.agInit(agParam);
    expect(component.data).toBe('test');
  });

  it('Should return empty if reclassifyCustomerComments is not define', () => {
    component.agInit({});
    expect(component.data).toBe('');
  });

  it('refresh method should return true', () => {
    expect(component.refresh()).toBeTruthy();
  });
});
