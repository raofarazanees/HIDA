import { Injectable } from '@angular/core';
import { itemMasterMessages } from '../../../modal/item-master-messages.constants';
import { matStep } from '../../../modal/submission.modal';

@Injectable({
  providedIn: 'root'
})
export class SubmissionDialogService {
  constructor() {}

  generateStepList(data: any): matStep[] {
    const stepList: matStep[] = [];
    if (data.updatedRecords.length) {
      stepList.push({
        key: 'saveForLater',
        label: 'Saving Modified Records',
        isError: false,
        message: itemMasterMessages.saveSubmission
      });
    }
    if (data.totalConfirmedRecords) {
      stepList.push({
        key: 'submit',
        label: 'Mastering the Records',
        isError: false,
        message: itemMasterMessages.submitSubmission
      });
    }
    stepList.push({
      key: data.totalRecords === data.totalConfirmedRecords ? 'complete' : 'escalate',
      label: data.totalRecords === data.totalConfirmedRecords ? 'Completing Task' : 'Escalating Task',
      isError: false,
      message:
        data.totalRecords === data.totalConfirmedRecords ? itemMasterMessages.completeSubmission : itemMasterMessages.escalateSubmission
    });
    return stepList;
  }
}
