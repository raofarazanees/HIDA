import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgGridActionCellComponent } from './action-cell-renderer.component';
import { MatIconModule } from '@angular/material/icon';

describe('AgGridActionCellComponent', () => {
  let component: AgGridActionCellComponent;
  let fixture: ComponentFixture<AgGridActionCellComponent>;

  const agParam = {
    api: {
      getRowNode: (id) => {
        return {
          id,
          value: 'test'
        };
      }
    },
    node: {
      id: 1
    },
    onEditClick: () => {
      return true;
    },
    onLogClick: () => {
      return true;
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridActionCellComponent],
      imports:[MatIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agInit method should update the initial values', () => {
    spyOn(agParam.api, 'getRowNode');
    component.agInit(agParam);
    expect(agParam.api.getRowNode).toHaveBeenCalled();
  });

  it('refresh method should return true', () => {
    expect(component.refresh()).toBeTruthy();
  });
});
