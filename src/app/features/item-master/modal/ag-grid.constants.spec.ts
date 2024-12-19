import { getColumnDefsForChangeLog, getDefaultColDef, getMasteredColumnDefs, getUnmasteredColumnDefs } from './ag-grid.constants';
describe('Item master AgGridConstnts', () => {
  it(`timeFormatter should return '-' for empty value`, () => {
    expect(getColumnDefsForChangeLog(null)[7].valueFormatter({})).toBe(' - ');
  });

  it(`unspscSource should return '-' for empty value`, () => {
    expect(getColumnDefsForChangeLog(null)[2].valueFormatter({})).toBe('-');
  });

  it(`comments should return '-' for empty value`, () => {
    expect(getColumnDefsForChangeLog(null)[4].valueFormatter({})).toBe('-');
  });

  it(`timeFormatter should return formated value`, () => {
    expect(getColumnDefsForChangeLog(null)[6].valueFormatter({ value: '2021-11-09T13:41:14.981+0000' })).toBeDefined();
  });

  it(`resourceName should return '-' for empty value`, () => {
    expect(getColumnDefsForChangeLog(null)[5].valueFormatter({})).toBe('-');
  });

  it(`valueFormatter should work for change log grid columns`, () => {
    expect(getColumnDefsForChangeLog(null)[2].valueFormatter({ value: 'test' })).toBe('test');
    expect(getColumnDefsForChangeLog(null)[4].valueFormatter({ value: 'test' })).toBe('test');
    expect(getColumnDefsForChangeLog(null)[5].valueFormatter({ value: 'test' })).toBe('test');
  });

  it(`Should return Mastered Columns`, () => {
    expect(getMasteredColumnDefs().length).toBe(11);
  });

  it(`valueFormatter should work for Mastered grid columns`, () => {
    expect(getMasteredColumnDefs()[1].valueFormatter({ value: 'test' })).toBe('test');
    expect(getMasteredColumnDefs()[2].valueFormatter({ value: 'test' })).toBe('test');
    expect(getMasteredColumnDefs()[10].valueFormatter({ value: 'test' })).toBe('test');
  });

  it(`should return '-' if value is empty for Mastered grid columns`, () => {
    expect(getMasteredColumnDefs()[1].valueFormatter({})).toBe('-');
    expect(getMasteredColumnDefs()[2].valueFormatter({})).toBe('-');
    expect(getMasteredColumnDefs()[10].valueFormatter({})).toBe('-');
  });

  it(`Should return unMastered Columns`, () => {
    expect(getUnmasteredColumnDefs().columns.length).toBe(9);
  });

  it(`Should set correct default attribute`, () => {
    const defaultColDef = getDefaultColDef();
    expect(defaultColDef.sortable).toBeTruthy();
  });
});
