import { initialState } from '../../model/manf-master-models/interface/manf-master.interface';
import {
    manfMasterEnum
  } from '../actions/index';
import { manfMasterReducer } from './manf-master.reducer';

const MOCK_MAP_DATA = [{
    "manfMapID": 1,
    "manfMasterID": "PM-1",
    "masteredManfName": "3M",
    "manfDisplayName": "",
    "distPGUID": "1",
    "distName": "claflin",
    "manfPGUID": "urn:asset:15:e5ee178d-7f83-4eae-bffa-826f964726b1",
    "distManfKey": "3M",
    "distManfDesc": "3M HEALTH CARE",
    "blacklistFlag": "N",
    "mapCreatedBy": "dev, testing",
    "mapUpdatedBy": "dev, testing",
    "mapCreatedDate": "2023-04-17 17:27:02.37259",
    "mapUpdatedDate": "2023-04-17 17:27:02.37259"
  }]

  const MOCK_CONTR_DATA =[
    {
      "masterID": "PM-1",
      "masterName": "3M",
      "masterCreatedBy": "dev, testing",
      "masterUpdatedBy": "dev, testing",
      "masterCreatedDate": "2023-04-14 22:18:52.417622",
      "masterUpdatedDate": "2023-04-14 22:24:54.097491"
    }
]

const MOCK_PARENT_DATA = [
  {
    "parentManfID": "PM-2",
    "parentManfName": "BIOFILM TSET",
    "active": "N",
    "createdBy": "One Time Load by ETL",
    "updatedBy": "Ijarda, Vijay",
    "createdDate": "2023-04-20 15:15:11",
    "updatedDate": "2023-04-26 10:16:09"
  }]

describe('Reducer: Manf Master Tool', () => {

   
    it('should loading true on MANF_MASTER_TAB_FORM_VALUE ', () => {
        const action = { type: manfMasterEnum.MANF_MASTER_TAB_FORM_VALUE,searchText:'',columnName:'MOCK',searchCondition:'AND' };
        const expected = { ...initialState, masteredTabSearchFormState:{searchText: action.searchText,columnName:action.columnName,searchCondition:action.searchCondition}};
        expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

   
    it('should loading true on GetParentManfRecords ', () => {
      const action = { type: manfMasterEnum.GET_PARENT_MANF_RECORDS, payload: null };
      const expected = { ...initialState, loadingState: {...initialState.loadingState, loading: true  }, parentManfRecords: null };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

    it('should loading true on GetParentManfRecordsSuccess ', () => {
      const action = { type: manfMasterEnum.GET_PARENT_MANF_RECORDS_SUCCESS, payload:MOCK_PARENT_DATA  };
      const expected = { ...initialState, loadingState: { ...initialState.loadingState,loading: false }, parentManfRecords: MOCK_PARENT_DATA };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

    it('should loading true on GetParentManfRecordsFail ', () => {
      const action = { type: manfMasterEnum.GET_PARENT_MANF_RECORDS_FAIL, payload: null };
      const expected = { ...initialState, loadingState: {...initialState.loadingState, loading: false, }, parentManfRecords: null };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

    it('should loading true on CloseDialogAt ', () => {
      const action = { type: manfMasterEnum.CLOSE_DIALOG_AT, date: 0,dialogType:'' };
      const expected = { ...initialState, closeDialogAt: {date: 0,dialogType:''} };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

    
    it('should loading true on CreateParentManfRecord ', () => {
      const action = { type: manfMasterEnum.CREATE_PARENT_MANF_RECORD, payload: null };
      const expected = { ...initialState, loadingState: {...initialState.loadingState,  loading: true, },  };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

    it('should loading true on CreateParentManfRecordFail ', () => {
      const action = { type: manfMasterEnum.CREATE_PARENT_MANF_RECORD_FAIL, payload: null };
      const expected = { ...initialState, loadingState: { ...initialState.loadingState, loading: false },  };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });

    it('should loading true on UpdateParentManfRecords ', () => {
      const action = { type: manfMasterEnum.UPDATE_PARENT_MANF_RECORDS, payload: null };
      const expected = { ...initialState, loadingState: {...initialState.loadingState,  loading: true },  };
      expect(manfMasterReducer(initialState, action)).toEqual(expected);
    });


})