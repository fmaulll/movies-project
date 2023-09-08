import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  data: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
}

const initialState: MovieState = {
  data: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieData: (state, action) => {
        const movieArr = state.data;
        
        const newMovieArr = movieArr.concat(action.payload);

        console.log(action.payload)

        state.data = newMovieArr;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setMovieData } = movieSlice.actions;

export default movieSlice.reducer;
