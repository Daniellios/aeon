export interface IChartTask {
  id: number;
  title: string;
  period_start: string;
  period_end: string;
  sub?: IChartTask[];
  level: number;
  subTaskAmount: number | undefined;
  isFolded: boolean;
}

export interface IChartState {
  project: string;
  period: string;
  chart: IChartTask;
  unfoldedTreeItems: IChartTask[];
  ghantDays: IGhantDay[];
  ghantWeeks: IGhantWeek[];
  ghantProjects: IGhantProject[];
  isAnyFolded: boolean;
}

export interface IGhantProject {
  id: number;
  name: string;
  level: number;
  subTaskAmount: number | undefined;
  projStart: Date;
  projPosition: number;
  projEnd: Date;
  projLength: number;
  isFolded: boolean;
}

export interface IGhantWeek {
  start: string;
  end: string;
}

export interface IGhantDay {
  date: string;
  projList: IDayInfo[];
  isWeekend: boolean;
}

export interface IDayInfo {
  name: string;
  projLevel: number;
  projPosition: number;
  projDayStart: number;
  projDuration: number;
}
