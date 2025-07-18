import { TFavourites } from "../../types/TFavourite";
import { TCats } from "../../types/TCats";
import { createSlice } from "@reduxjs/toolkit";
import {
  getLikesAction,
  deleteLikeAction,
  addLikeAction,
  getFavoritesCatsAction,
} from "../../actions/ApiActions";

export interface FavouriteState {
  favourite: TFavourites;
  favouriteCats: TCats;
  isLoad: boolean;
  error: string;
}

const initialState: FavouriteState = {
  favourite: [],
  favouriteCats: [],
  isLoad: false,
  error: "",
};

export const favouriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  selectors: {
    getLikes: (state) => {
      return state.favourite;
    },
    getFavorite(state) {
      return state.favouriteCats;
    },
    getFavoriteCats(state) {
      return state.favouriteCats;
    },
    getIsLoadFavorite(state) {
      return state.isLoad;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLikesAction.fulfilled, (state, action) => {
      state.favourite = action.payload;
      state.isLoad = false;
      state.error = "";
    });
    builder.addCase(getLikesAction.pending, (state) => {
      state.isLoad = true;
      state.error = "";
    });
    builder.addCase(getLikesAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoad = false;
    });
    builder.addCase(deleteLikeAction.fulfilled, (state, action) => {
      const newData = state.favourite.filter(
        (like) => like.cat_id !== action.payload.cat_id
      );
      state.favourite = newData;
      const newCats = state.favouriteCats.filter(
        (cat) => cat.id !== action.payload.cat_id
      );
      state.favouriteCats = newCats;
      state.isLoad = false;
      state.error = "";
    });
    builder.addCase(deleteLikeAction.pending, (state) => {
      state.isLoad = true;
      state.error = "";
    });
    builder.addCase(deleteLikeAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoad = false;
    });
    builder.addCase(addLikeAction.fulfilled, (state, action) => {
      state.favourite.push(action.payload);
      state.isLoad = false;
      state.error = "";
    });
    builder.addCase(addLikeAction.pending, (state) => {
      state.isLoad = true;
      state.error = "";
    });
    builder.addCase(addLikeAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoad = false;
    });
    builder.addCase(getFavoritesCatsAction.fulfilled, (state, action) => {
      state.favouriteCats = action.payload;
      state.isLoad = false;
      state.error = "";
    });
    builder.addCase(getFavoritesCatsAction.pending, (state, _) => {
      state.isLoad = true;
      state.error = "";
    });
    builder.addCase(getFavoritesCatsAction.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message ? action.error.message : "";
    });
  },
});

export const { getLikes, getFavorite, getFavoriteCats, getIsLoadFavorite } =
  favouriteSlice.selectors;
export const favouriteReducer = favouriteSlice.reducer;
