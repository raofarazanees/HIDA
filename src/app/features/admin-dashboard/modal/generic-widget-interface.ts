export interface GenericWidgetModal {
  cols: number;
  rows: number;
  y: number;
  x: number;
  type: string;
  key: string;
  bottomKey: string;
  color: string;
  title: string;
  access: string[];
  config: WidgetConfig;
  genericTitle?: string;
  allowedRoles?: string[]
}

interface WidgetConfig {
  historyBtnText?: string;
  uploadBtnText?: string;
  uploadBtnTextSecondary?: string;
  downloadBtnText?: string;
  genericBtnText?: string;
  downloadUrl?: string;
  hideAppUrl?: string;
  info: string;
  historyBtnTooltip?: string;
  genericBtnTooltip?: string;
  uploadBtnTooltip?: string;
  uploadBtnSecTooltip?: string;
  downloadBtnTooltip?: string;
  cardStepInfo?: string;
  csvTemplateUrl?: string;
  csvTemplateUrlSec?: string;
  isCenterOnCard?: boolean;
  csvName?: string;
  csvNameSec?: string
  userEmail?:string;
  userName?:string;
  mandatoryField?:string;
  adHocFileUploadBtnText?: string;
  adHocBtnTooltip?: string;
  adHocCsvName?: string;
  adHocCsvTemplateUrl?: string;
  sideBarTitleUploader?: string;
  sideBarTitleAlternetUploader?: string;
  sideBarTitleAdHocUploader?: string;
  sideBarTitleSKUUploader?: string;
  skuButtonText?: string;
  skuBtnTooltip?: string;
  skuCsvName?: string;
  skuCsvTemplateUrl?: string;
  sideBarTitleSKUloader?: string;
}
