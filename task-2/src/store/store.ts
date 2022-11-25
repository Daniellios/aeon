import { configureStore } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  IChartState,
  IChartTask,
  IGhantDay,
  IGhantWeek,
  IGhantProject,
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
  unfoldedTreeItems: [],
  ghantDays: [],
  ghantWeeks: [],
  ghantProjects: [],
  isAnyFolded: false,
};

export const projectData = createSlice({
  name: "project",
  initialState,
  reducers: {
    foldTask: (state, action: PayloadAction<number>) => {
      const updatedFoldLevel = state.unfoldedTreeItems.map((item) => {
        if (item.level > action.payload) {
          return { ...item, isFolded: true };
        } else {
          return item;
        }
      });
      console.log(updatedFoldLevel);

      state.isAnyFolded = true;
      state.unfoldedTreeItems = updatedFoldLevel;
    },
    unfoldTask: (state, action: PayloadAction<number>) => {
      const updatedFoldLevel = state.unfoldedTreeItems.map((item) => {
        if (item.level > action.payload) {
          return { ...item, isFolded: false };
        } else {
          return item;
        }
      });
      console.log(updatedFoldLevel);
      state.isAnyFolded = false;
      state.unfoldedTreeItems = updatedFoldLevel;
    },

    setGhantWeeks: (state, action: PayloadAction<IGhantWeek[]>) => {
      state.ghantWeeks = action.payload;
    },
    setGhantDays: (state, action: PayloadAction<IGhantDay[]>) => {
      state.ghantDays = action.payload;
    },
    setGhantProjects: (state, action: PayloadAction<IGhantProject[]>) => {
      state.ghantProjects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getChartData.fulfilled,
      (state, action: PayloadAction<IChartState>) => {
        if (state.unfoldedTreeItems.length === 0) {
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
            if (state.unfoldedTreeItems.length === 0) {
              state.unfoldedTreeItems = [firstObj];
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
                state.unfoldedTreeItems = [...state.unfoldedTreeItems, newTask];
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    project: projectData.reducer,
  },
});

export const selectData = (state: RootState) => state.project;
export const selectGhantDays = (state: RootState) => state.project.ghantDays;
export const selectGhantWeeks = (state: RootState) => state.project.ghantWeeks;
export const selectGhantProjects = (state: RootState) =>
  state.project.ghantProjects;
// export default the store

export default store;
export const {
  foldTask,
  unfoldTask,
  setGhantDays,
  setGhantWeeks,
  setGhantProjects,
} = projectData.actions;

export type RootState = ReturnType<typeof store.getState>;
