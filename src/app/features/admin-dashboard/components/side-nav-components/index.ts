import { BrandMasterUploadDialogComponent } from './brand-master-upload-dialog/brand-master-upload-dialog.component';
import { ItemProductIncrementalProcessComponent } from './../grid-html-components/item-product-incremental-process/item-product-incremental-process.component';
import { ProductGraphMergedDownloadDialogComponent } from './product-graph-merged-download-dialog/product-graph-merged-download-dialog.component';
import { UnspscReclassificatioDialogComponent } from './unspsc-reclassificatio-dialog/unspsc-reclassificatio-dialog.component';
import { UnspscClientCorrectionDialogComponent } from './unspsc-client-correction-dialog/unspsc-client-correction-dialog.component';
import { OntologyFacilityTypeDialogComponent } from './ontology-failitytype-dialog/ontology-failitytype-dialog.component';
import { OntologyManufacturerDialogComponent } from './ontology-manufacturer-dialog/ontology-manufacturer-dialog.component';
import { ManufacturerParentChildDialogComponent } from './manufacturer-parent-child-dialog/manufacturer-parent-child-dialog.component';
import { AttributeMasterDialogComponent } from './attribute-master-dialog/attribute-master-dialog.component';
import { AttributeMasterDownloadDialogComponent } from './attribute-master-download-dialog/attribute-master-download-dialog.component';
import { I2PItemPairsForResolutionDialogComponent } from './i2p-item-pairs-for-resolution-dialog/i2p-item-pairs-for-resolution-dialog.component';
import { ProductAttributeTaggingDownloadDialogComponent } from './product-attribute-tagging-download-dialog/product-attribute-tagging-download-dialog.component';
import { ProductAttributeUploadDialogComponent } from './product-attribute-upload-dialog/product-attribute-upload-dialog.component';
import { ProductGraphUploadDialogComponent } from './product-graph-upload-dialog/product-graph-upload-dialog.component';
import { DownloadGraphProductPreviewComponent } from './product-graph-merged-download-dialog/download-graph-product-preview/download-graph-product-preview.component';
import { BrandProductMappingUploadComponent } from './brand-product-mapping-upload/brand-product-mapping-upload.component';
import { BrandProductMappingDownloadComponent } from './brand-product-mapping-download/brand-product-mapping-download.component';
import { BrandProductMappingReviewDialogComponent } from './brand-product-mapping-download/brand-product-mapping-review-dialog/brand-product-mapping-review-dialog.component';
import { ProductLevelClusteringUploadComponent } from './product-level-clustering-upload/product-level-clustering-upload.component';
import { ProductLabellingStagingCurationDownloadComponent } from './product-labelling-staging-curation-download/product-labelling-staging-curation-download.component';
import { ProductStagingReviewRecordsComponent } from './product-labelling-staging-curation-download/product-staging-review-records/product-staging-review-records.component';
import { ProductLabellingStagingCurationUploadComponent } from './product-labelling-staging-curation-upload/product-labelling-staging-curation-upload.component';
import { MasteringCmsComponent } from '../grid-html-components/mastering-cms/mastering-cms.component';
import { UomUploadDialogComponent } from './uom-upload-dialog/uom-upload-dialog.component';
import { AspToolUploadDialogComponent } from './asp-tool-upload-dialog/asp-tool-upload-dialog.component';
import { UnspscToolUploadDialogComponent } from './unspsc-tool-upload-dialog/unspsc-tool-upload-dialog.component';
import { UnspscToolComponent } from '../grid-html-components/unspsc-tool/unspsc-tool.component';
import { BrandFeatureSuggestionComponent } from '../grid-html-components/brand-feature-suggestion/brand-feature-suggestion.component';
import { BrandFeatureSuggestionDialogComponent } from './brand-feature-suggestion-dialog/brand-feature-suggestion-dialog.component';

export const sideNavComponents = [
  UnspscReclassificatioDialogComponent,
  UnspscClientCorrectionDialogComponent,
  OntologyFacilityTypeDialogComponent,
  OntologyManufacturerDialogComponent,
  ManufacturerParentChildDialogComponent,
  AttributeMasterDialogComponent,
  AttributeMasterDownloadDialogComponent,
  I2PItemPairsForResolutionDialogComponent,
  ProductAttributeTaggingDownloadDialogComponent,
  ProductAttributeUploadDialogComponent,
  ProductGraphUploadDialogComponent,
  ProductGraphMergedDownloadDialogComponent,
  BrandMasterUploadDialogComponent,
  DownloadGraphProductPreviewComponent,
  BrandProductMappingUploadComponent,
  BrandProductMappingDownloadComponent,
  BrandProductMappingReviewDialogComponent,
  ProductLevelClusteringUploadComponent,
  ProductLabellingStagingCurationDownloadComponent,
  ProductStagingReviewRecordsComponent,
  ProductLabellingStagingCurationUploadComponent,
  UomUploadDialogComponent,
  AspToolUploadDialogComponent,
  UnspscToolUploadDialogComponent,
  BrandFeatureSuggestionDialogComponent
];

export const genericHtmlGridComponents = [ItemProductIncrementalProcessComponent, MasteringCmsComponent, UnspscToolComponent, BrandFeatureSuggestionComponent];

export const sideNavComponentMapping = {
  unspsc_reclassification: UnspscReclassificatioDialogComponent,
  unspsc_client_correction: UnspscClientCorrectionDialogComponent,
  ontology_facilitytype: OntologyFacilityTypeDialogComponent,
  ontology_manufacturer: OntologyManufacturerDialogComponent,
  manufacturer_parent_child: ManufacturerParentChildDialogComponent,
  attribute_master: AttributeMasterDialogComponent,
  attribute_master_generic: AttributeMasterDownloadDialogComponent,
  item_pairs_for_resolution: I2PItemPairsForResolutionDialogComponent,
  product_attribute_generic: ProductAttributeTaggingDownloadDialogComponent,
  product_attribute: ProductAttributeUploadDialogComponent,
  product_manage_graphs: ProductGraphUploadDialogComponent,
  product_manage_graphs_generic: ProductGraphMergedDownloadDialogComponent,
  brand_master: BrandMasterUploadDialogComponent,
  brand_mapping: BrandProductMappingUploadComponent,
  brand_mapping_generic: BrandProductMappingDownloadComponent,
  product_level_clustering: ProductLevelClusteringUploadComponent,
  product_staging_curation_generic: ProductLabellingStagingCurationDownloadComponent,
  product_staging_curation: ProductLabellingStagingCurationUploadComponent,
  uom_file_upload: UomUploadDialogComponent,
  asp_tool: AspToolUploadDialogComponent,
  unspsc_tool: UnspscToolUploadDialogComponent,
  brand_feature_suggestion: BrandFeatureSuggestionDialogComponent
};

export const htmlComponentMapping = {
  incremental_process: ItemProductIncrementalProcessComponent,
  mastering_cms: MasteringCmsComponent,
  unspsc_workflow: UnspscToolComponent,
  brand_feature_suggestion: BrandFeatureSuggestionComponent
};
