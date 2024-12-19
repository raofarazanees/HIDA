export const itemMasterMessages: any = {
  clearUnspscCode: `You have already selected UNSPSC Code. <br>Do you want to clear the UNSPSC Code?`,
  commpleteTask: `Are you sure you want to <strong>Complete</strong> this task ?`,
  escalateToLead: `This task will be escalated to Exception Lead's approval. <br>Please click on 'OK' to escalate this task.`,
  noUnMasteredRecordsToMaster: `There are no records to master<br><br>Please click on 'OK' to complete this task.`,
  recordsSaved: 'Records are saved successfully',
  recordsSubmitted: 'Records are submited successfully',
  noMasteredRecords: 'There is no mastered records to show',
  noUnMasteredRecords: 'There are no unmastered records to show',
  noChangeLogRecords: 'There is no change log records found',
  noRecordForSearch: 'No records found for your search.',
  noRecordsFound: 'No records found.',
  errorWhileFetchingRecords: 'An error occured while fetching the records',
  predictedToolTipInfo: 'Unmastered items are Predicted by Data Science and Rules Engine',
  clientCorrectionToolTipInfo: 'Items are provided for Correction by a Client',
  unpredictedToolTipInfo: 'Unmastered items are Unpredicted by Data Science and Rules Engine',
  reclassificationToolTipInfo: 'Items are provided for UNSPSC Reclassification',
  saveSubmission: `Saving the modified records for future use...`,
  submitSubmission: `Submitting the records where Ambugity is Confirmed...`,
  escalateSubmission: `Escalating the Task for Exception Lead's approval...`,
  completeSubmission: `Updating the task as Completed...`,
  tasknavigationOnComplete: 'Task has been COMPLETED and navigating back to task inbox',
  tasknavigationOnEscalte: 'Task has been ESCALATED to Exception Lead and navigating back to task inbox'
};

export function replaceMessageWithParams(message: string, params: object) {
  return message.replace(/\{(\w+)\}/g, (match, token) => {
    return params[token] !== undefined ? params[token] : match;
  });
}
