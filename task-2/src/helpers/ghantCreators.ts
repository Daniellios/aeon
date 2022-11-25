import { format, isEqual, isWeekend, eachDayOfInterval } from "date-fns";
import type {
  IChartTask,
  IDayInfo,
  IGhantDay,
  ITaskInfo,
} from "../utils/interfaces";
import moment from "moment";

// Определение занятости каждого дня
export const checkDayLoad = (
  day: Date,
  dayIndex: number,
  projects: ITaskInfo[]
): IGhantDay => {
  const filtered = projects
    .filter((proj) => isEqual(day, proj.projStart))
    .map((proj): IDayInfo => {
      return {
        name: proj.name,
        projDuration: proj.projLength,
        projLevel: proj.level,
        projPosition: proj.projPosition,
        projDayStart: dayIndex,
      };
    });

  return {
    date: format(day, "dd"),
    isWeekend: isWeekend(day),
    projList: filtered,
  };
};

// Работы по каждому проекту
export const getProjectSchedule = (chartItems: IChartTask[]) => {
  return chartItems.map((task, idx): ITaskInfo => {
    const taskStart = moment(task.period_start).toDate();
    const taskEnd = moment(task.period_end).toDate();
    const taskLength = eachDayOfInterval({
      start: taskStart,
      end: taskEnd,
    }).length;

    return {
      id: task.id,
      name: task.title,
      subTaskAmount: task.subTaskAmount,
      level: task.level,
      projPosition: idx,
      projStart: taskStart,
      projEnd: taskEnd,
      projLength: taskLength,
      isFolded: task.isFolded,
    };
  });
};
