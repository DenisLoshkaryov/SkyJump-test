export interface DataItem {
  id: number;
  source: string;
  leads: number;
  revenueLeads: number;
  revenueCalls: number;
  level: number;
  parentId?: number;
}
