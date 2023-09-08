import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  cart: {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
    price: number;
  }[];
}

const initialState: MovieState = {
  cart: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCart: (state, action) => {
        const obj = action.payload
        const arrCart = state.cart

        if (!arrCart.find((item) => item.imdbID === obj.imdbID)) {
            arrCart.push(obj)
        }

        state.cart = arrCart
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart } = movieSlice.actions;

export default movieSlice.reducer;
