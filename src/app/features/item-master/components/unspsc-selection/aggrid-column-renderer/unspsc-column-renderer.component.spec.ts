import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UNSPSCSource } from '../../../modal/ag-grid.constants';
import { mockDsPredictedRecord, mockManualUnspseRecord } from '../../../modal/item-master-mock-data.constants';
import { UnspscColumnRendererComponent } from './unspsc-column-renderer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('UnspscColumnRendererComponent', () => {
  let component: UnspscColumnRendererComponent;
  let fixture: ComponentFixture<UnspscColumnRendererComponent>;

  const agParam = {
    details: 'dsUnspscHierarchy',
    data: mockDsPredictedRecord,
    api: {
      redrawRows: jasmine.createSpy()
    },
    node: mockDsPredictedRecord,
    value: '42311552',
    draggable: false,
    selectionValue: UNSPSCSource.DS,
    onCellSelection: jasmine.createSpy(),
    score: 85
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnspscColumnRendererComponent],
      imports:[MatIconModule,MatTooltipModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnspscColumnRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agInit method should update the initial values', () => {
    component.agInit(agParam);
    expect(component.params.details).toBe('dsUnspscHierarchy');
  });

  it('UNSPSE tooltip should generate', () => {
    component.agInit(agParam);
    expect(component.tooltip).toContain('Medical Equipment and Accessories and Supplies');
  });

  it('Manual UNSPSE hierarchy should work properlly', () => {
    component.agInit({ details: 'manual', data: mockManualUnspseRecord });
    expect(component.tooltip).toContain('Apparel and Luggage and Personal Care Products');
  });

  it('onCellSelection should update the unspscSource', () => {
    component.agInit(agParam);
    component.onCellSelection();
    expect(component.params.data.unspscSource).toBe(UNSPSCSource.DS);
  });

  it('refresh method should return false', () => {
    expect(component.refresh()).toBeFalsy();
  });

  it(`Manual tooltip should work `, () => {
    // @ts-ignore
    expect(component.getTooltip('manual', mockManualUnspseRecord)).toContain('Apparel and Luggage and Personal Care Products');
  });

  it(`dsUnspscHierarchy tooltip should work `, () => {
    // @ts-ignore
    expect(component.getTooltip('dsUnspscHierarchy', mockDsPredictedRecord)).toContain('Medical Equipment and Accessories and Supplies');
  });

  it(`tooltip should return empty for null dsUnspscHierarchy`, () => {
    // @ts-ignore
    expect(component.getTooltip('dsUnspscHierarchy', { dsUnspscHierarchy: null })).toBe('');
  });

  it(`prepareTooltip tooltip should return empty if segment, family, class and  commodity titles are null`, () => {
    // @ts-ignore
    expect(component.prepareTooltip({}).trim()).toBe('');
  });

  it(`prepareUNSPSC method should return initial unspec object`, () => {
    component.agInit(agParam);
    // @ts-ignore
    expect(component.prepareUNSPSC().unspscSource).toBe('workbench DS');
  });
});
