export interface stagingCurationProducts {
    currentUNSPSCCode:string;
    currentUNSPSCDesc:string;
    newUNSPSCCode:string;
    newUNSPSCDesc:string;
    prodBrandDist:string;
    prodBrandMastered:string;
    prodConvFactor:string;
    prodDesc:string;
    prodManf:string;
    prodParentManf:string;
    prodSKU:string;
    prodUNSPSCCodeDist:string;
    prodUNSPSCDescDist:string;
    productID:string;
    unspscAnalystName:string;
    unspscComments:string;
}


export interface productItemView {
    distributorName:string;
    itemPGUID:string;
    itemKey:string;
    manfKey:string;
    manfDesc:string;
    stdManfDesc:string;
    stdParentManf:string;
    itemDesc:string;
    itemUNSPSC:string;
    itemUNSPSCDesc:string;
}
