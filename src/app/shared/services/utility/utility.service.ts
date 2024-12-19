import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}

  copyObject(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  getAgGridRowHeight(): number {
    return 30;
  }

  getDistributorNameFromId(id: number): string {
    const distributorList = [
      { name: 'Claflin', id: 1 },
      { name: 'Concordance', id: 2 },
      { name: 'Henry Schein', id: 3 },
      { name: 'Mckesson', id: 4 },
      { name: 'Medline', id: 5 },
      { name: 'Owens-And-Minor', id: 6 },
      { name: 'Thermo-Fisher', id: 7 },
      { name: 'Cardinal', id: 8 }
    ];
    const filteredList = distributorList.filter((item: any) => item.id === id);
    return filteredList.length ? filteredList[0].name : '';
  }
}
