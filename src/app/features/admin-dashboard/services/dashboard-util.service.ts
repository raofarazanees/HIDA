import { Injectable } from '@angular/core';
import { GridType, GridsterConfig } from 'angular-gridster2';
import { WorkbenchSwaggerService } from 'src/app/swagger';
import { GenericWidgetModal } from '../modal/generic-widget-interface';
import { masteringReadOnlyRoles, masteringRoles } from '../components/dashboard-panel/dashboard-panel.component';
import * as moment from 'moment';
const gridSetting = {
  cols: 2,
  rows: 2,
  y: 0,
  x: 0
}

const gridSettingDynamic = (count, isManager) => {
  return {
    cols: (count > 3 || isManager) ? 4 : 2,
    rows: 2,
    y: 0,
    x: 0
  }

}

const downloadMergeUnmergeSteps = `Download File Merge/Unmerge CSV :
                                   1. Click on the Download File button.
                                   2. Choose the search condition AND / OR, default [AND].
                                   3. Choose search filter criteria from the drop-down list and enter your search text or choose a date from the date picker for date-related fields.
                                      Ex. Choose [ Product Description ] option and enter Search text [ 3M ].
                                   4. Click on Add Criteria to add multiple filter criteria.
                                      - If you want to remove filter criteria, click on remove/delete (visible only if you have added more than one filter criteria list).
                                   5. Click on the Search Button placed at the bottom after adding filter criteria to search for the product items.
                                   6. Upon clicking the Search button, a list of Product items appears on the new screen for the given filter criteria.
                                   7. At the bottom of the dialog screen, you will find a Download button..
                                   8. Click on the Download button to save the CSV file with displayed product items on your local machine.
                                   9. If you wish to refine your search at any time, close the current screen, add/remove filter criteria, and repeat step 6 as necessary.`;

const downloadStringCuration = `Download File / Create Task - Staging Curation :
                                   1. Click on the Download File / Create button.
                                   2. Choose the search condition AND / OR, default [AND].
                                   3. Choose search filter criteria from the drop-down list and enter your search text or choose a date from the date picker for date-related fields.
                                      Ex. Choose [ Product SKU ] option and enter Search text.
                                   4. Click on Add Criteria to add multiple filter criteria
                                      - If you want to remove filter criteria, click on remove/delete (visible only if you have added more than one filter criteria list).
                                   5. Click on the Search Button placed at the bottom after adding filter criteria to search for the product items.
                                   6. Upon clicking the Search button, a list of Product items appears on the new screen for the given filter criteria.
                                   7. A list of Product items with checkbox selections will appear on the screen.
                                   8. Click on the checkboxes or on the rows of the product (Can select multiple) to mark that particular product as available for downloading / tasks.
                                   9. You can select all products across all lists/pages by using the First checkbox found in the Table Header.
                                   8. Click on the Download button to save the CSV file with selected product items on your local machine for offline curation and use the upload file button to upload CSV.
                                   9. To do online curation, use the Create Task button. It will create a new task with selected products..
                                      - When the task is ready, you will receive an email notification..
                                   10. If you wish to refine your search at any time, close the current screen, add/remove filter criteria, and repeat step 6 as necessary.`;


@Injectable({
  providedIn: 'root'
})
export class DashboardUtilsService {

  month = moment().format('MMM');
  year = moment().format('YYYY')
  env: string
  constructor(private wbSwagger: WorkbenchSwaggerService) {
    this.getAppRunningEnv()
  }

  getDashboardGridsterConfig(): GridsterConfig {
    return {
      gridType: GridType.ScrollVertical,
      minCols: 10,
      maxCols: 10,
      minRows: 10,
      maxRows: 10,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: true
      },
    };
  }

  //Always push UNSPSC Reclassification and UNSPSC Client Correction at bottom

  getDashboardWidgetConfig(email: string, name: string, allowedRolesCount = 0, isHaveAdminRole = false): GenericWidgetModal[] {
    return [
      {
        ...gridSettingDynamic(allowedRolesCount, isHaveAdminRole),
        type: 'html',
        key: 'mastering_cms',
        bottomKey: '',
        color: '#008000d1',
        title: 'Mastering',
        access: [...masteringRoles, ...masteringReadOnlyRoles],
        genericTitle: '',
        config: {
          downloadBtnText: '',
          info: 'Mastering CMS',
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: '',
        bottomKey: '',
        color: '#008000d1',
        title: 'Product Information Management',
        access: ['Mastering_Manager', 'Mastering_WFadmin', 'Mastering_Product', 'Mastering_Product_Read_Only', 'Mastering_Product_Admin'], //'Mastering_Manager','Mastering_WFadmin','Mastering_Product','Mastering_Product_Read_Only'
        genericTitle: '',
        config: {
          genericBtnText: 'Manage Product Information',
          hideAppUrl: '#/hida/mastering/product-entitlement',
          info: 'Product Information Management'
        }
      },
      {
        ...{ ...gridSetting, cols: 4 },
        type: 'generic',
        key: 'asp_tool',
        bottomKey: '',
        color: '#008000d1',
        title: 'Average Selling Price (ASP) Tool & Unit of Measure (UoM) Process',
        access: ['Dashboard_View', 'Dashboard_Item_Taxonomy_Admin', 'Dashboard_WFadmin'],
        genericTitle: '',
        config: {
          uploadBtnText: 'Upload File - ASP Anomaly Detection',
          info: 'Initiate ASP Anomaly Detection Workflow and Initiate UoM Process',
          csvTemplateUrl: 'assets/templates/ASP_Parameters_template.csv',
          isCenterOnCard: false,
          csvName: `ASP_Parameters_${this.env}.csv`,
          mandatoryField: '',
          uploadBtnTextSecondary: 'Upload File - UoM Regular',
          csvTemplateUrlSec: 'assets/templates/HIDA_UOM_Regular_template.csv',
          csvNameSec: `HIDA_UOM_Regular_${this.env}.csv`,
          adHocFileUploadBtnText: 'Upload File - UoM Ad hoc',
          adHocCsvName: `HIDA_UOM_Adhoc_${this.env}.csv`,
          adHocCsvTemplateUrl: 'assets/templates/HIDA_UOM_adhoc_template.csv',
          sideBarTitleUploader: 'Average Selling Price (ASP) Process',
          sideBarTitleAlternetUploader: 'Unit of Measure (UoM - Regular) Process',
          sideBarTitleAdHocUploader: 'Unit of Measure (UoM - Ad hoc) Process',
          sideBarTitleSKUUploader: 'Taxonomy Review',
          skuButtonText : 'Upload File - Taxonomy Review',
          skuCsvName: `taxonomy_review_${this.env}.csv`,
          skuCsvTemplateUrl: 'assets/templates/HIDA_Taxonomy_Review_template.csv',
        }
      },
      {
        ...gridSetting,
        type: 'html',
        key: 'unspsc_workflow',
        bottomKey: '',
        color: '#008000d1',
        title: 'UNSPSC Tool',
        access: ['Dashboard_View', 'Dashboard_Item_Taxonomy_Admin', 'Dashboard_WFadmin'],
        genericTitle: '',
        config: {
          uploadBtnText: '',
          info: 'Initiate Workflow to manage UNSPSC',
          isCenterOnCard: true,
          mandatoryField: '',
          userEmail: email,
          userName: name

        }
      },
      //  {
      //   ...gridSetting,
      //    type: 'generic',
      //    key: 'unspsc_tool',
      //    bottomKey: '',
      //    color: '#008000d1',
      //    title: 'UNSPSC Tool',
      //    access: ['Dashboard_View'],
      //    genericTitle: '',
      //    config: {
      //      uploadBtnText: 'Upload File',
      //      info: 'Initiate Workflow & Trigger to manage UNSPSC corrections',
      //      csvTemplateUrl:'assets/templates/UNSPSC_Parameters_template.csv',
      //      isCenterOnCard: true,
      //      csvName:`UNSPSC_Parameters_${this.env}.csv`,
      //      mandatoryField:'',
      //      userEmail:email,
      //      userName:name

      //    }
      //  },
      //  {
      //   ...gridSetting,
      //    type: 'html',
      //    key: 'incremental_process',
      //    bottomKey: '',
      //    color: '#008000d1',
      //    title: 'Trigger to process UNSPSC Corrections',
      //    access: ['Dashboard_View'],
      //    genericTitle: '',
      //    config: {
      //      uploadBtnText: 'Trigger - UNSPSC Corrections',
      //      genericBtnText: 'unspsc_workflow_trigger',
      //      info: 'Trigger to process UNSPSC Corrections'
      //    }
      //  },
      {
        ...gridSetting,
        type: 'generic',
        key: 'ontology_manufacturer',
        bottomKey: '',
        color: '#008000d1',
        title: 'Ontology: Manufacturer',
        access: [],
        config: {
          historyBtnText: '',
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download File',
          downloadUrl: this.wbSwagger.getdownloadCurrentMappedDescriptionsURL('Manufacturer'),
          info: 'To Upload and Download the Manufacturer Internal descriptions for mapping.'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'manufacturer_parent_child',
        bottomKey: '',
        color: '#008000d1',
        title: 'Manufacturer Parent - Child',
        access: [],
        config: {
          historyBtnText: '',
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download File',
          downloadUrl: this.wbSwagger.getdownloadManfParentChildURL(),
          info: 'To Upload and Download the Manufacturer Parent & Child Relationships.'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'ontology_facilitytype',
        bottomKey: '',
        color: '#008000d1',
        title: 'Ontology: FacilityType',
        access: [],
        config: {
          historyBtnText: '',
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download File',
          downloadUrl: this.wbSwagger.getdownloadCurrentMappedDescriptionsURL('FacilityType'),
          info: 'To Upload and Download the FacilityType Internal descriptions for mapping.'
        }
      },
      {
        ...gridSetting,
        type: 'html',
        key: 'incremental_process',
        bottomKey: '',
        color: '#008000d1',
        title: 'Item to Product Triggers',
        access: ['Dashboard_Item_Taxonomy_Admin'],
        genericTitle: '',
        config: {
          uploadBtnText: 'Trigger Incremental Process',
          genericBtnText: 'i2p_trigger',
          info: 'To Trigger the I2P Incremental Process and Snowflake Outbound Refresh Process'
        }
      },
      {
        ...{ ...gridSetting, cols: 3 },
        type: 'generic',
        key: 'item_pairs_for_resolution',
        bottomKey: '',
        color: '#008000d1',
        title: 'Item Pairs For Resolution',
        access: ['Dashboard_Item_Taxonomy_Admin'],
        config: {
          historyBtnText: '',
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download File',
          downloadUrl: this.wbSwagger.getDownloadItemPairForResolutionURL(email, name),
          info: 'To Upload and Download Item Pairs for resolution. Each uploaded file creates a task',
          downloadBtnTooltip: 'Download CSV file with item pairs',
          uploadBtnTooltip: 'Upload CSV file with item pairs for resolution each uploaded file creates a task',
          csvTemplateUrl: 'assets/templates/HIDA_ItemPairs_ForResolution_UP_{mmm}_{yyyy}_template.csv',
          csvName: `HIDA_ItemPairs_ForResolution_UP_${this.month}_${this.year}_${this.env}.csv`,
          mandatoryField: 'pair_id, is_pair, analyst_name and vendor_name'
        }
      },
      {
        ...{ ...gridSetting, cols: 3 },
        type: 'generic',
        key: 'product_manage_graphs',
        bottomKey: '',
        color: '#008000d1',
        title: 'Merge / Unmerge',
        access: ['Dashboard_Item_Taxonomy_Admin'],
        genericTitle: 'Download Graphs',
        config: {
          uploadBtnText: 'Upload File',
          genericBtnText: 'Download File',
          info: 'Merge / UnMerge Graphs using Upload And Download',
          uploadBtnTooltip: 'Merge / UnMerge Products Items using Upload each uploaded file creates a task for Exception Lead for review',
          cardStepInfo: downloadMergeUnmergeSteps,
          csvTemplateUrl: 'assets/templates/HIDA_Graphs_Products_Items_UP_template.csv',
          csvName: `HIDA_Graphs_Products_Items_UP_${this.env}.csv`,
          mandatoryField: 'action, product_id and item_pguid'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'attribute_master',
        bottomKey: '',
        color: '#008000d1',
        title: 'Attribute Master',
        access: [],
        config: {
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download File',
          downloadUrl: this.wbSwagger.getDownloadAttributeMasterURL(),
          info: 'To Upload and Download Attribute Master at product level'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'product_attribute',
        bottomKey: '',
        color: '#008000d1',
        title: 'Product Attribute Tagging',
        access: [],
        genericTitle: 'Download Products Attribute Tagging',
        config: {
          uploadBtnText: 'Upload File',
          genericBtnText: 'Download File',
          info: 'Manage Product Attribute Tagging using Upload And Download'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'brand_master',
        bottomKey: '',
        color: '#008000d1',
        title: 'Brand Master',
        access: [],
        genericTitle: 'Download Brand Master',
        config: {
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download File',
          downloadUrl: this.wbSwagger.getBrandMasterRecordsURL(),
          info: 'To Manage Brand Master using Upload And Download'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'brand_mapping',
        bottomKey: '',
        color: '#008000d1',
        title: 'Product Brand Mapping',
        access: [],
        genericTitle: 'Download Brand Product Mapping',
        config: {
          uploadBtnText: 'Upload File',
          genericBtnText: 'Download File',
          info: 'To Manage Brand Product Mapping using Upload And Download'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'product_level_clustering',
        bottomKey: '',
        color: '#008000d1',
        title: 'Product Level Clustering',
        access: ['Dashboard_Item_Taxonomy_Admin'],
        genericTitle: 'Download Product Level Clustering',
        config: {
          uploadBtnText: 'Upload File',
          info: 'To Manage Product Level Clustering using Upload',
          csvTemplateUrl: 'assets/templates/HIDA_Product_UNSPSC_Labelling_UP_template.csv',
          isCenterOnCard: true,
          csvName: `HIDA_Product_UNSPSC_Labelling_UP_${this.env}.csv`,
          mandatoryField: 'product_id, unspsc and data_source'
        }
      },
      {
        ...gridSetting,
        type: 'html',
        key: 'incremental_process',
        bottomKey: '',
        color: '#008000d1',
        title: 'Brand / Attribute Triggers',
        access: ['Dashboard_Item_Taxonomy_Admin', 'Dashboard_View', 'Dashboard_WFadmin'], //'Dashboard_Item_Taxonomy_Admin','Dashboard_View','Dashboard_WFadmin'
        genericTitle: '',
        config: {
          uploadBtnText: 'Trigger Brand / Attribute DAG',
          genericBtnText: 'brand_trigger',
          info: 'To Trigger the Brand / Attribute Automation Process'
        }
      },
      {
        ...{ ...gridSetting, cols: 3 },
        type: 'generic',
        key: 'uom_file_upload',
        bottomKey: '',
        color: '#008000d1',
        title: 'Unit of Measure',
        access: [],
        genericTitle: 'upload Unit of Measure workflow',
        config: {
          genericBtnText: 'Download File',
          genericBtnTooltip: 'Download CSV file with UOM data',
          uploadBtnText: 'Upload File (Input)',
          uploadBtnTextSecondary: 'Upload File (Corrections)',
          info: 'To manage Unit of Measure workflow using upload',
          isCenterOnCard: false,
          csvTemplateUrl: 'assets/templates/HIDA_UOM_Workflow_Initiation_UP_template.csv',
          csvName: `HIDA_UOM_Workflow_Initiation_UP_${this.env}.csv`,
          csvNameSec: `HIDA_UOM_Correction_UP_${this.env}.csv`,
          csvTemplateUrlSec: 'assets/templates/HIDA_UOM_Correction_UP_template.csv',
          userEmail: email,
          userName: name
        }
      },
      {
        ...{ ...gridSetting, cols: 3 },
        type: 'generic',
        key: 'product_staging_curation',
        bottomKey: '',
        color: '#008000d1',
        title: 'Staging Curation - Product UNSPSC Labelling',
        access: [],
        genericTitle: 'Download Product Labelling - Staging Curation',
        config: {
          genericBtnText: 'Download File / Create Task',
          uploadBtnText: 'Upload File - With Labels',
          uploadBtnTextSecondary: 'Upload File - For Labelling',
          info: 'To Manage Product Labelling for Curation using Upload and Download',
          uploadBtnTooltip: 'Upload CSV file with UNSPSC Labels each uploaded file creates a task for Exception Lead for review',
          uploadBtnSecTooltip: 'Upload CSV file For UNSPSC labelling each uploaded file creates a task for Curator role to do labelling and save task for review',
          cardStepInfo: downloadStringCuration,
          csvTemplateUrl: 'assets/templates/HIDA_Staging_Curation_Product_With_UNSPSC_Labels_UP_template.csv',
          csvTemplateUrlSec: 'assets/templates/HIDA_Staging_Curation_Product_For_UNSPSC_Labelling_UP_template.csv',
          csvName: `HIDA_Staging_Curation_Product_With_UNSPSC_Labels_UP_${this.env}.csv`,
          csvNameSec: `HIDA_Staging_Curation_Product_For_UNSPSC_Labelling_UP_${this.env}.csv`,
          mandatoryField: ' (With Labels) - product_id, unspsc, and analyst_comments and (For Labelling) - product_id'
        }
      },
      {
        ...gridSetting,
        type: 'html',
        key: 'incremental_process',
        bottomKey: '',
        color: '#008000d1',
        title: 'Staging Curation Triggers',
        access: [],
        genericTitle: '',
        config: {
          uploadBtnText: 'Trigger Incremental Process',
          genericBtnText: 'staging_curation_trigger',
          info: 'To Trigger the Staging Curation Snowflake Outbound Refresh Process'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'unspsc_reclassification',
        bottomKey: 'unspsc_reclassification_history',
        color: '#008000d1',
        title: 'UNSPSC Reclassification',
        access: [],
        config: {
          historyBtnText: 'File Upload History',
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download Sample Template',
          downloadUrl: 'assets/templates/HIDA_UNSPSC_RECLASSIFICATION_8DigitUNSPSC_yyyyMMdd.csv',
          info: 'Please upload list of mastered Items to an UNSPSC category to reclassify. (New Task will be created)'
        }
      },
      {
        ...gridSetting,
        type: 'generic',
        key: 'unspsc_client_correction',
        bottomKey: 'unspsc_client_correction_history',
        color: '#008000d1',
        title: 'UNSPSC Client Correction',
        access: [],
        config: {
          historyBtnText: 'File Upload History',
          uploadBtnText: 'Upload File',
          downloadBtnText: 'Download Sample Template',
          downloadUrl: 'assets/templates/HIDA_UNSPSC_CLIENT_CORRECTION_yyyyMMdd.csv',
          info: 'Please upload the file with the list of Items to correct the UNSPSC as per client requested. (New Task will be created)'
        }
      },
      {
        ...{ ...gridSetting, cols: 3 },
        type: 'html',
        key: 'brand_feature_suggestion',
        bottomKey: '',
        color: '#008000d1',
        title: 'Brand Feature Suggestions',
        access: ['Dashboard_View', 'Dashboard_Item_Taxonomy_Admin', 'Dashboard_WFadmin'],
        genericTitle: '',
        config: {
          info: 'Initiate Workflow to manage Market/Manufacturer',
          isCenterOnCard: true,
          userEmail: email,
          userName: name,
          historyBtnText: '',
          uploadBtnText: 'Upload File',
          downloadBtnText: '',
          downloadBtnTooltip: 'Download CSV file with item pairs',
          uploadBtnTooltip: 'Upload CSV file with brand feature suggestion each uploaded file creates a task',
          csvTemplateUrl: `assets/templates/HIDA_Brand_Suggestion_${this.env}.csv`,
          csvName: `HIDA_Brand_Suggestion_${this.env}.csv`,
          mandatoryField: 'product_id'
        }
      }
    ];
  }

  private getAppRunningEnv() {
    const base_url = window.location.href;
    if (base_url.includes('-dev.dev')) {
      this.env = 'dev';
    } else if (base_url.includes('-int.int')) {
      this.env = 'int';
    } else if (base_url.includes('-uat.uat')) {
      this.env = 'uat';
    } else if (base_url.includes('-prod.prod')) {
      this.env = 'prod';
    } else {
      this.env = 'dev';
    }
  }

}



