import { MasteredTabSearchForm } from '../../model/manf-master-models/interface/manf-master.interface';
import {
  CloseDialogAt,
  CreateParentManfRecord,
  CreateParentManfRecordFail,
  CreateParentManfRecordSuccess,
  MasteredTabSearchFormAction,
  UpdateParentManfRecords,
  UpdateParentManfRecordsFail,
  UpdateParentManfRecordsSuccess,
  manfMasterEnum
} from './manf-master.actions';

describe('Actions :: Tools and Filter', () => {
 
  it('should create an MANF_MASTER_TAB_FORM_VALUE action', () => {
    const action = MasteredTabSearchFormAction(MasteredTabSearchForm.default());
    expect(action.type).toEqual(manfMasterEnum.MANF_MASTER_TAB_FORM_VALUE);
  });



  it('should create an CREATE_PARENT_MANF_RECORD action', () => {
    const action = CreateParentManfRecord({ payload: '' });
    expect(action.type).toEqual(manfMasterEnum.CREATE_PARENT_MANF_RECORD);
  });

  it('should create an CREATE_PARENT_MANF_RECORD_SUCCESS action', () => {
    const action = CreateParentManfRecordSuccess({ payload: '' });
    expect(action.type).toEqual(manfMasterEnum.CREATE_PARENT_MANF_RECORD_SUCCESS);
  });

  it('should create an CREATE_PARENT_MANF_RECORD_FAIL action', () => {
    const action = CreateParentManfRecordFail({ payload: '' });
    expect(action.type).toEqual(manfMasterEnum.CREATE_PARENT_MANF_RECORD_FAIL);
  });

  it('should create an UPDATE_PARENT_MANF_RECORDS action', () => {
    const action = UpdateParentManfRecords({ payload: '' });
    expect(action.type).toEqual(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS);
  });

  it('should create an CREATE_PARENT_MANF_RECORD_SUCCESS action', () => {
    const action = UpdateParentManfRecordsSuccess({ payload: '' });
    expect(action.type).toEqual(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS_SUCCESS);
  });

  it('should create an CREATE_PARENT_MANF_RECORD_FAIL action', () => {
    const action = UpdateParentManfRecordsFail({ payload: '' });
    expect(action.type).toEqual(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS_FAIL);
  });

  it('should create an CLOSE_DIALOG_AT action', () => {
    const action = CloseDialogAt({date:0,dialogType:''});
    expect(action.type).toEqual(manfMasterEnum.CLOSE_DIALOG_AT);
  });
  
});
