import { Pipe, PipeTransform } from '@angular/core';
import { DataItem } from '../models/data-item';

@Pipe({
  name: 'dataSort'
})
export class DataSortPipe implements PipeTransform {

  transform(value: DataItem[], field: string, desc: boolean): DataItem[] {
    let newVal: DataItem[] = [];
    switch (field) {
      case 'none':
        newVal = value;
        break;
      case 'percentOfLeads':
        const allLeads = value.reduce((curr, item) => curr = item.leads, 0);
        newVal = value.sort((a, b) => (a.leads / allLeads) - (b.leads / allLeads));
        break;
      case 'revenueFull':
        newVal = value.sort((a, b) => (a.revenueLeads + a.revenueCalls) - (b.revenueLeads + b.revenueCalls));
        break;
      case 'source':
        newVal = value.sort((a,b) => a[field] > b[field] ? 1 : -1);
        break;
      default:
        newVal = value.sort((a, b) => a[field] - b[field]);
    }
    console.log(value);
    console.log(newVal);
    return desc ? newVal.reverse() : newVal;
  }

}
