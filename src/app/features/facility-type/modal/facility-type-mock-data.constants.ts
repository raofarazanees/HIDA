export const mockMasterRecord = {
  distributorPguid: 3,
  distributorName: 'henry-schein',
  internalFacilityGroupDesc: 'HOME CARE',
  internalFacilitySubgroupDesc: 'DURABLE MEDICAL EQUIPMENT',
  externalFacilityKey: '**',
  externalFacilityDesc: 'UNDEFINED',
  facilityMapId: 'fa4f02fa-3d17-4a15-9143-addb8bf6a031',
  facilityInternalId: 'urn:onto:168437'
};

export const mockTaskResponse = {
  workflowId: '1',
  taskId: '5bd77dc9-535f-4d71-a791-24bb243c54b7',
  workflowDefinitionId: 'hida.mastering.facilitytype',
  action: 'UPDATE',
  priority: 10,
  payload:
    '{"profileUid":"1615529140779","comments":"initial","facilityTypeDesc":"DESIGN VERONIQUE","timeWorked":{"workedUsers":[{"timeWorked":"14458.66","discountedTime":"0.0","userId":"fe5f25f0-69f3-11eb-b0d5-af849b4b2d14"}],"lastActivityLoggedTime":"2021-12-08 07:19:56.300","totalRunningTime":"14458.66"},"facilityTypeKey":"DESI","userExpertise":"Expert","originalAcquiredTime":"2021-06-11 11:54:45.762","distributorPguid":"2","facilityTypePguid":"urn:asset:15:c1cd68cc-99f4-42c7-a554-498cddedfhjb","recordStatus":"Newly Created","taskTitle":"demo_task_1","activeFlag":"Y","elapsedTime":7.25}',
  status: 'CLAIMED',
  assignees: 'Mastering_Curator',
  taskTitle: 'demo_task_1',
  genericPayload: {
    profileUid: '1615529140779',
    comments: 'initial',
    facilityTypeDesc: 'DESIGN VERONIQUE',
    timeWorked: {
      workedUsers: [
        {
          timeWorked: '14458.66',
          discountedTime: '0.0',
          userId: 'fe5f25f0-69f3-11eb-b0d5-af849b4b2d14'
        }
      ],
      lastActivityLoggedTime: '2021-12-08 07:19:56.300',
      totalRunningTime: '14458.66'
    },
    facilityTypeKey: 'DESI',
    userExpertise: 'Expert',
    originalAcquiredTime: '2021-06-11 11:54:45.762',
    distributorPguid: '1',
    facilityTypePguid: 'urn:asset:15:c1cd68cc-99f4-42c7-a554-498cddedfhjb',
    recordStatus: 'Newly Created',
    taskTitle: 'demo_task_1',
    activeFlag: 'Y',
    elapsedTime: 7.25
  },
  originalAcquiredTime: '2021-08-26 07:03:45.412'
};

export const mockUpdatedRecords = [
  {
    facilityInternalId: null,
    internalFacilityGroupDesc: null,
    internalFacilitySubgroupDesc: null,
    distributorPguid: '1',
    externalFacilityKey: '25',
    externalFacilityDesc: 'FURNITURE BID',
    facilityTypePguid: 'urn:asset:14:a34e4f27-8505-443c-ac7b-1eb51dd7d65e',
    status: null,
    mapping: {
      value: 'ASC | AMBULATORY SURGERY CENTER',
      id: 'urn:onto:168439'
    }
  }
];

export const mockUnmasteredDataResponse = {
  totalRecords: 1,
  list: [
    {
      facilityInternalId: null,
      internalFacilityGroupDesc: null,
      internalFacilitySubgroupDesc: null,
      distributorPguid: '1',
      externalFacilityKey: '25',
      externalFacilityDesc: 'FURNITURE BID',
      facilityTypePguid: 'urn:asset:14:a34e4f27-8505-443c-ac7b-1eb51dd7d65e',
      status: null,
      mapping: {
        value: 'ASC | AMBULATORY SURGERY CENTER',
        id: 'urn:onto:168439'
      }
    }
  ]
};

export const mockMappingOptions = [
  {
    id: '1',
    value: 'ASC | AMBULATORY SURGERY CENTER'
  },
  {
    id: 2,
    value: 'HOME CARE | HOME CARE'
  }
];
