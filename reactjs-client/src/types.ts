import { PivotConfig, Query } from '@cubejs-client/core';

export type ChartType =  'bar' |  'line' | 'pie' ;

export type Config = {
  apiUrl: string;
  apiToken: string;
  useWebSockets?: boolean;
  useSubscription?: boolean;
  query: Query;
  pivotConfig: PivotConfig;
  chartType: ChartType;
};
