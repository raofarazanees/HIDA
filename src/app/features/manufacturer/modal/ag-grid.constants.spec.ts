import { getColumnDefsForChangeLog, getDefaultColDef, getMasteredColumnDefs, getUnmasteredColumnDefs } from './ag-grid.constants';

describe('Manufacturer AgGridConstnts', () => {
  it(`should return '-' if value is empty for Mastered grid columns`, () => {
    expect(getColumnDefsForChangeLog()[3].valueFormatter({})).toBe(' - ');
    expect(getColumnDefsForChangeLog()[4].valueFormatter({})).toBe(' - ');
  });

  it(`timeFormatter should return formated value`, () => {
    expect(getColumnDefsForChangeLog()[3].valueFormatter({ value: '2021-11-09T13:41:14.981+0000' })).toBeDefined();
  });

  it(`Should return unMastered Columns`, () => {
    expect(getUnmasteredColumnDefs().length).toBe(3);
  });

  it(`Should return Mastered Columns`, () => {
    expect(getMasteredColumnDefs().length).toBe(4);
  });

  it(`Should set correct default attribute`, () => {
    const defaultColDef = getDefaultColDef();
    expect(defaultColDef.sortable).toBeTruthy();
  });
});
