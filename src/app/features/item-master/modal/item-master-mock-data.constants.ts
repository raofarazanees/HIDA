export const mockTableViewResponse = {
  limit: 100,
  offset: 0,
  totalRecords: 2,
  data: [
    {
      itemPGUID: 'urn:onto:247191',
      level1: {
        code: '53000000',
        title: 'Apparel and Luggage and Personal Care Products'
      },
      level2: {
        code: '53130000',
        title: 'Personal care products'
      },
      level3: {
        code: '53131600',
        title: 'Bath and body'
      },
      level4: {
        code: '53131602',
        title: 'Hair care supplies'
      }
    },
    {
      itemPGUID: 'urn:onto:247186',
      level1: {
        code: '53000000',
        title: 'Apparel and Luggage and Personal Care Products'
      },
      level2: {
        code: '53130000',
        title: 'Personal care products'
      },
      level3: {
        code: '53131500',
        title: 'Dental'
      },
      level4: {
        code: '53131510',
        title: 'Denture adhesive'
      }
    }
  ]
};

export const mockDsPredictedRecord = {
  segmentCode: '',
  segmentTitle: '',
  familyCode: '',
  familyTitle: '',
  classCode: '',
  classTitle: '',
  commodityCode: '',
  commodityTitle: '',
  distributorPguid: '8',
  itemPguid: 'urn:asset:16:0000ebf4-881d-45aa-bf9a-604d1f1e46fc',
  internalItemKey: '',
  unspscCode: '',
  reUnspscId: null,
  reUnspscHierarchy: null,
  reCreatedDate: '2021-11-12T17:11:14.897+0000',
  reStatus: 'Completed',
  dsUnspscId: '42311552',
  dsUnspscHierarchy:
    '{"segmentCode":"42000000","segmentTitle":"Medical Equipment and Accessories and Supplies","familyCode":"42310000","familyTitle":"Wound care products","classCode":"42311500","classTitle":"Bandages and dressings and related products","commodityCode":"42311552","commodityTitle":"Medical and surgical adherent tapes for general use","ontologyItemPguid":"urn:onto:200420"}',
  dsConfidenceScore: 0.87,
  dsRank: 1,
  dsStatus: '201',
  dsFailureReason: null,
  dsModelVersion: 'tf2_aug',
  dsResponseReceivedAt: '2021-11-12T19:02:32.000+0000',
  dsResponseTime: 3180,
  unspscSource: 'workbench DS'
};

export const mockManualUnspseRecord = {
  segmentCode: '53000000',
  segmentTitle: 'Apparel and Luggage and Personal Care Products',
  familyCode: '',
  familyTitle: '',
  classCode: '',
  classTitle: '',
  commodityCode: '',
  commodityTitle: '',
  distributorPguid: '8',
  itemPguid: 'urn:asset:16:0000ebf4-881d-45aa-bf9a-604d1f1e46fc',
  manufacturerDesc: null,
  productDesc: 'TAPE 1INX2.5YD STRETCHED ELASTIC',
  unspscSource: 'Workbench other',
  ambiguityFlag: 'Confirmed',
  internalItemKey: 'urn:onto:246972',
  unspscCode: '53000000',
  reUnspscId: null,
  reUnspscHierarchy: null,
  reCreatedDate: '2021-11-12T17:11:14.897+0000',
  reStatus: 'Completed',
  dsUnspscId: '42311552',
  dsUnspscHierarchy:
    '{"segmentCode":"42000000","segmentTitle":"Medical Equipment and Accessories and Supplies","familyCode":"42310000","familyTitle":"Wound care products","classCode":"42311500","classTitle":"Bandages and dressings and related products","commodityCode":"42311552","commodityTitle":"Medical and surgical adherent tapes for general use","ontologyItemPguid":"urn:onto:200420"}',
  dsConfidenceScore: 0.87,
  dsRank: 1,
  dsStatus: '201',
  dsFailureReason: null,
  dsModelVersion: 'tf2_aug',
  dsResponseReceivedAt: '2021-11-12T19:02:32.000+0000',
  dsResponseTime: 3180
};

export const mockTreeViewData = [
  {
    title: 'Apparel and Luggage and Personal Care Products',
    details: {
      code: '53000000',
      dataMode: 'ALL'
    },
    level: 0,
    expandable: true,
    isLoading: false
  },
  {
    title: 'Building and Construction Machinery and Accessories',
    details: { code: '22000000', dataMode: 'ALL' },
    level: 0,
    expandable: true,
    isLoading: false
  }
];

export const mockTreeViewNodeObj = {
  title: 'Boys athletic wear',
  details: {
    code: '53102903',
    parentNode: {
      title: 'Athletic wear',
      details: {
        code: '53102900',
        parentNode: {
          title: 'Clothing',
          details: {
            code: '53100000',
            parentNode: {
              title: 'Apparel and Luggage and Personal Care Products',
              details: {
                code: '53000000',
                dataMode: 'ALL',
                childCount: 5
              },
              level: 0,
              expandable: true,
              isLoading: false
            },
            dataMode: 'ALL',
            childCount: 18
          },
          level: 1,
          expandable: true,
          isLoading: false
        },
        dataMode: 'ALL',
        childCount: 4
      },
      level: 2,
      expandable: true,
      isLoading: false
    },
    dataMode: 'ALL'
  },
  level: 3,
  expandable: false,
  isLoading: false
};

export const mockUnspscObj = {
  unspscCode: '53131602',
  segmentCode: '53000000',
  segmentTitle: 'Apparel and Luggage and Personal Care Products',
  familyCode: '53130000',
  familyTitle: 'Personal care products',
  classCode: '53131600',
  classTitle: 'Bath and body',
  commodityCode: '53131602',
  commodityTitle: 'Hair care supplies',
  internalItemKey: 'urn:onto:247191',
  ambiguityFlag: 'Confirmed',
  unspscSource: 'workbench other'
};
