import { PairingActionsEnum } from '../actions';

export interface PairingState {
  loading: boolean;
  pairs: any;
}

export const initialState: PairingState = {
  loading: false,
  pairs: { records: null, totalRecords: 0 }
};

export function pairingReducer(state: PairingState = initialState, action: any): PairingState {
  switch (action.type) {
    case PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION:
      return {
        ...state,
        loading: true
      };
    case PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION_SUCCESS:
    case PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION_FAIL:
      return {
        ...state,
        loading: false,
        pairs: formatStatus(JSON.parse(JSON.stringify(action.payload)))
      };
    default:
      return state;
  }
}

function formatStatus({ records, totalRecords }: any): any {
  records = records.map((item: any) => {
    const formattedStatus = ['Approved For Review', 'Approved'].includes(item.status)
      ? true
      : ['Rejected For Review', 'Rejected'].includes(item.status)
      ? false
      : undefined;
    return {
      ...item,
      status: formattedStatus,
      formattedStatus
    };
  });
  return { totalRecords, records };
}
