import { Injectable } from '@angular/core';
import { DataItem } from '../models/data-item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  campaigns: string[] = ['Facebook', 'GoogleDisplay', 'GoogleSearch', 'Organic', 'Outbrain', 'Yahoo', 'Taboola', 'Zemanta'];

  constructor() {
  }

  getFirstLevelData(): DataItem[] {
    const data: DataItem[] = [];
    this.campaigns.forEach((campaign, i) => {
      data.push({
        id: i,
        source: campaign,
        leads: Math.round(Math.random() * 1000),
        revenueLeads: Math.round(Math.random() * 2800),
        revenueCalls: Math.round(Math.random() * 120),
        level: 1
      });
    });
    return data;
  }

  getChildren(parentId, parentLevel): DataItem[] {
    const data: DataItem[] = [];

    for(let i = 0; i < Math.round(Math.random() * 6) + 1; i++) {
      data.push({
        id: parentLevel === 1 ? Math.round(Math.random() * 100) : Math.round(Math.random() * 1000),
        source: 'some source',
        leads: Math.round(Math.random() * 1000),
        revenueLeads: Math.round(Math.random() * 2800),
        revenueCalls: Math.round(Math.random() * 120),
        level: parentLevel + 1
      });
    }
    return data;
  }
}
