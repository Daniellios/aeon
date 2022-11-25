import { configureStore } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  IChartState,
  IChartTask,
  IGhantDay,
  IGhantWeek,
} from "../utils/interfaces";
import { getChartData } from "./service/getChartData";

const initialState: IChartState = {
  project: "",
  period: "",
  chart: {
    id: 1,
    title: "",
    period_start: "",
    period_end: "",
    sub: [],
    level: 1,
    subTaskAmount: 0,
    isFolded: false,
  },
  ghantDays: [],
  ghantWeeks: [],
  isAnyFolded: false,
  chartItems: [],
};

export const projectData = createSlice({
  name: "project",
  initialState,
  reducers: {
    foldTask: (state, action: PayloadAction<number>) => {
      const updatedFoldLevel = state.chartItems.map((item) => {
        if (item.level > action.payload) {
          return { ...item, isFolded: true };
        } else {
          return item;
        }
      });
      state.isAnyFolded = true;
      state.chartItems = updatedFoldLevel;
    },
    unfoldTask: (state, action: PayloadAction<number>) => {
      const updatedFoldLevel = state.chartItems.map((item) => {
        if (item.level > action.payload) {
          return { ...item, isFolded: false };
        } else {
          return item;
        }
      });
      state.isAnyFolded = false;
      state.chartItems = updatedFoldLevel;
    },
    setGhantDays: (state, action: PayloadAction<IGhantDay[]>) => {
      state.ghantDays = action.payload;
    },
    setGhantWeeks: (state, action: PayloadAction<IGhantWeek[]>) => {
      state.ghantWeeks = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getChartData.fulfilled,
      (state, action: PayloadAction<IChartState>) => {
        if (state.chartItems.length === 0) {
          let sub = action.payload.chart.sub;
          let level = 1;
          const subTaskAmount = sub?.length;

          while (sub) {
            const firstObj: IChartTask = {
              id: action.payload.chart.id,
              title: action.payload.chart.title,
              period_start: action.payload.chart.period_start,
              period_end: action.payload.chart.period_end,
              level: level++,
              subTaskAmount: subTaskAmount,
              isFolded: false,
            };
            if (state.chartItems.length === 0) {
              state.chartItems = [firstObj];
            }
            while (sub) {
              sub.forEach((task) => {
                const newTask: IChartTask = {
                  id: task.id,
                  title: task.title,
                  period_start: task.period_start,
                  period_end: task.period_end,
                  level: level,
                  subTaskAmount: task.sub?.length,
                  isFolded: false,
                };
                state.chartItems = [...state.chartItems, newTask];
                if (task.sub) {
                  sub = task.sub;
                } else {
                  sub = undefined;
                  return;
                }
              });
              break;
            }
          }
          state.chart = action.payload.chart;
          state.project = action.payload.project;
          state.period = action.payload.period;
        }
      }
    );
  },
});

// config the store
const store = configureStore({
  reducer: {
    project: projectData.reducer,
  },
});

export const selectData = (state: RootState) => state.project;
export const selectGhantDays = (state: RootState) => state.project.ghantDays;
export const selectGhantWeeks = (state: RootState) => state.project.ghantWeeks;
// export default the store

export default store;
export const { foldTask, unfoldTask, setGhantDays, setGhantWeeks } =
  projectData.actions;

export type RootState = ReturnType<typeof store.getState>;
