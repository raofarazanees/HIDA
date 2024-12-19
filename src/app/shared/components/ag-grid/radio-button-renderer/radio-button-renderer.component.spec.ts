import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';

import { RadioButtonRendererComponent } from './radio-button-renderer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RadioButtonRendererComponent', () => {
  let component: RadioButtonRendererComponent;
  let fixture: ComponentFixture<RadioButtonRendererComponent>;

  let params:any = {
    value: 'A',
    api: {
      getRowNode: () => {}
    },
    node: {
      id: 1
    },
    data:{
      productID:12
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatRadioModule,FormsModule,ReactiveFormsModule ],
      declarations: [RadioButtonRendererComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'agInit' should update params and status `, () => {
    component.agInit(params);
    expect(component.status).toBe('A');
  });

  it(`'agInit' should update params and header should Approve `, () => {
    params.colDef ={
      headerName:'Approve'
    }
    fixture.detectChanges();
    component.agInit(params);
    expect(component.status).toBe('A');
  });

  it(`'agInit' should update params and header should Reject `, () => {
    params.colDef ={
      headerName:'Reject'
    }
    fixture.detectChanges();
    component.agInit(params);
    expect(component.status).toBe('A');
  });

  it(`'agInit' should update params and status `, () => {
    params.colDef = null;
    fixture.detectChanges();
    component.agInit(params);
    expect(component.status).toBe('A');
  });

  it(`'refresh' should return true `, () => {
    expect(component.refresh(params)).toBeTruthy();
  });

});
