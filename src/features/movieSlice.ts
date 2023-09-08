import { createSlice } from "@reduxjs/toolkit";
import { MoviesType } from "../type";
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
  loading: boolean;
}

const initialState: MovieState = {
  cart: [],
  loading: false,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCart: (state, action) => {
        const obj: MoviesType = action.payload
        const arrCart = state.cart

        if (!arrCart.find((item) => item.imdbID === obj.imdbID)) {
            arrCart.push(obj)
        }

        state.cart = arrCart
    },
    deleteCartItem: (state, action) => {
      const obj: MoviesType = action.payload
      const arrCart = state.cart
      const index = arrCart.findIndex((item) => item.imdbID === obj.imdbID)
      
      arrCart.splice(index, 1)

      state.cart = arrCart
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart, deleteCartItem, setLoading } = movieSlice.actions;

export default movieSlice.reducer;
