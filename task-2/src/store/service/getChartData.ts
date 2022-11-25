import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IChartState } from "../../utils/interfaces";
import { offlineData } from "../../constants/constants";

export const getChartData: any = createAsyncThunk(
  "data/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IChartState>(
        `http://82.202.204.94/tmp/test.php`
      );
      // return offlineData;
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить данные");
    }
  }
);
