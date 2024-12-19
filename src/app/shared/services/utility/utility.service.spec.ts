import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'copyObject' method should work properlly`, () => {
    expect(service.copyObject({ id: 1 }).id).toBe(1);
  });

  it(`'getAgGridRowHeight' method should work properlly`, () => {
    expect(service.getAgGridRowHeight()).toBe(30);
  });

  it(`'getDistributorNameFromId' method should work properlly`, () => {
    expect(service.getDistributorNameFromId(1)).toBe('Claflin');
  });

  it(`'getDistributorNameFromId' method should return empty string for invalid distributor`, () => {
    expect(service.getDistributorNameFromId(100)).toBe('');
  });
});
