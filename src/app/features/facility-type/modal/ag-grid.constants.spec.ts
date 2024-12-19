import { getColumnDefsForChangeLog } from './ag-grid.constants';
describe('FacilityType AgGridConstnts', () => {
  it(`timeFormatter should return '-' for empty value`, () => {
    expect(getColumnDefsForChangeLog()[5].valueFormatter({})).toBe(' - ');
  });

  it(`timeFormatter should return formated value`, () => {
    expect(getColumnDefsForChangeLog()[4].valueFormatter({ value: '2021-11-09T13:41:14.981+0000' })).toBeDefined();
  });
});
