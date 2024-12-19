export const mockUnmasteredDataResponse = {
  totalRecords: 2,
  list: [
    {
      distributorPguid: '1',
      externalManufacturerKey: 'PFMI',
      externalManufacturerDesc: 'PFM MEDICAL',
      manufacturerPguid: '1',
      status: null,
      revenue: 551819,
      internalManufacturerKey: null,
      internalManufacturerDesc: null,
      manufacturerInternalId: null
    },
    {
      distributorPguid: '1',
      externalManufacturerKey: 'BRY',
      externalManufacturerDesc: 'BRYAN MEDICAL',
      manufacturerPguid: '2',
      status: null,
      revenue: 246918,
      internalManufacturerKey: null,
      internalManufacturerDesc: null,
      manufacturerInternalId: null
    }
  ]
};

export const mockUpdatedRecords = [
  {
    distributorPguid: '1',
    externalManufacturerKey: 'PFMI',
    externalManufacturerDesc: 'PFM MEDICAL',
    manufacturerPguid: '1',
    status: null,
    revenue: 551819,
    internalManufacturerKey: null,
    internalManufacturerDesc: null,
    manufacturerInternalId: null,
    mapping: {
      value: '1888 MILLS',
      id: 'urn:onto:154778'
    }
  }
];

export const mockSubmitedRecords = [
  {
    distributorPguid: '1',
    externalManufacturerKey: 'PFMI',
    externalManufacturerDesc: 'PFM MEDICAL',
    manufacturerPguid: '1',
    status: null,
    revenue: 551819,
    internalManufacturerKey: null,
    internalManufacturerDesc: '1888 MILLS',
    manufacturerInternalId: 'urn:onto:154778'
  }
];

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
