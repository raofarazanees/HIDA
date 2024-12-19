export const mockTaskResponse = {
  workflowId: '1',
  taskId: '5bd77dc9-535f-4d71-a791-24bb243c54b7',
  workflowDefinitionId: 'hida.mastering.manufacturer',
  action: 'UPDATE',
  priority: 10,
  payload:
    '{"distributorPguid":"1","comments":"initial","timeWorked":{"workedUsers":[{"timeWorked":"14402.256","discountedTime":"0.0","userId":"fe5f25f0-69f3-11eb-b0d5-af849b4b2d14"}],"lastActivityLoggedTime":"2021-11-25 07:52:46.09","totalRunningTime":"14402.256"},"taskTitle":"Medline_Manufacturer_20210628","originalAcquiredTime":"2021-08-26 07:03:45.412"}',
  status: 'CLAIMED',
  assignees: 'Mastering_Curator',
  taskTitle: 'Medline_Manufacturer_20210628',
  genericPayload: {
    distributorPguid: '5',
    comments: 'initial',
    timeWorked: {
      workedUsers: [
        {
          timeWorked: '14402.256',
          discountedTime: '0.0',
          userId: 'fe5f25f0-69f3-11eb-b0d5-af849b4b2d14'
        }
      ],
      lastActivityLoggedTime: '2021-11-25 07:52:46.09',
      totalRunningTime: '14402.256'
    },
    taskTitle: 'Medline_Manufacturer_20210628',
    originalAcquiredTime: '2021-08-26 07:03:45.412'
  }
};

export const mockSalesDataResponse = {
  totalRecords: 1,
  salesRestateList: [
    {
      itemKey: '1',
      manufacturerKey: '2',
      sku: 'xyz',
      prodDesc: 'test',
      status: 'A'
    },
    {
      itemKey: '2',
      manufacturerKey: '3',
      sku: 'xyz',
      prodDesc: 'test2',
      status: 'R'
    }
  ]
};
