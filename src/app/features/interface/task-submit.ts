export interface confirmedByUser {
  confirmedByUserEmail: string;
  confirmedBy: string;
}

export interface taskSubmitInfo extends confirmedByUser {
  workflowID: string;
  taskID: string;
  taskTitle: string;
  actionPerformed: string;
  confirmationComments: string;
}
