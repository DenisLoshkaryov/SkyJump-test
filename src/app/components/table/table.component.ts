import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../../services';
import { DataItem } from '../../models/data-item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  refreshInterval;
  firstLevelData: DataItem[];
  levelsOpened: {[name: number]: Set<number>} = {};
  childrenItems: {[name: number]: DataItem[]} = {};
  sortingParams: {field: string; desc: boolean} = {field: 'none', desc: false};

  constructor(private dataService: DataService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.firstLevelData = this.dataService.getFirstLevelData();
    this.refreshInterval = setInterval(() => {
      this.firstLevelData = this.dataService.getFirstLevelData();
      Object.keys(this.levelsOpened).forEach(level => {
        this.levelsOpened[level].forEach(item => {
          this.getChildren(item, +level);
        });
      });
    }, 15000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  }

  getTotalByFiels(field: string): number {
    return this.firstLevelData.map(item => item[field]).reduce((current, item) => current + item, 0);
  }

  openItem(level: number, id: number): void {
    if (!this.levelsOpened[level]) {
      this.levelsOpened[level] = new Set();
    }
    this.levelsOpened[level].add(id);
    this.getChildren(id, level);
  }

  getPercentOfLeads(leads: number): number {
    return leads / this.getTotalByFiels('leads');
  }

  getChildren(parentId: number, parentLevel: number): void {
    this.childrenItems[parentId] = this.dataService.getChildren(parentId, parentLevel);
  }


  setSortingParams(field: string): void {
    if (this.sortingParams.field === field) {
      this.sortingParams.desc = !this.sortingParams.desc;
    } else {
      this.sortingParams.field = field;
      this.sortingParams.desc = false;
    }
    console.log(this.sortingParams);
  }
}
