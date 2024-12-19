import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { BrandCVResponse } from '../../model/manf-master-models/interface/brand-cv-filter-options';
import {
  BrandMasterEnum,
  GetBrandCVRecords,
  GetBrandCVRecordsSuccess,
  GetBrandCVRecordsFail
} from './brand-master.actions';
import { BrandCVData } from '../../components/brand-master/brand-cv/brand-cv.component.spec';

describe('BrandMaster Actions', () => {
  describe('GetBrandCVRecords', () => {
    it('should create an action with the correct type and payload', () => {
      // Prepare test data
      const payload: ProductSearchCriteria = ProductSearchCriteria.default();

      // Call the action creator
      const action = GetBrandCVRecords({ payload });

      // Assert the action has the correct type and payload
      expect(action.type).toEqual(BrandMasterEnum.GET_BRAND_CV_RECORDS);
      expect(action.payload).toBe(payload);
    });
  });

  describe('GetBrandCVRecordsSuccess', () => {
    it('should create an action with the correct type and payload', () => {
      // Prepare test data
      const payload: BrandCVResponse = {totalRecords:1,records:BrandCVData};

      // Call the action creator
      const action = GetBrandCVRecordsSuccess({ payload });

      // Assert the action has the correct type and payload
      expect(action.type).toEqual(BrandMasterEnum.GET_BRAND_CV_RECORDS_SUCCESS);
      expect(action.payload).toBe(payload);
    });
  });

  describe('GetBrandCVRecordsFail', () => {
    it('should create an action with the correct type and payload', () => {
      // Prepare test data
      const payload = {/* test data */};

      // Call the action creator
      const action = GetBrandCVRecordsFail({ payload });

      // Assert the action has the correct type and payload
      expect(action.type).toEqual(BrandMasterEnum.GET_BRAND_CV_RECORDS_FAIL);
      expect(action.payload).toBe(payload);
    });
  });
});
