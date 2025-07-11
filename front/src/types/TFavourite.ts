export interface IFavourite {
  cat_id: string;
  created_at: string;
}

export type TLikedCat = {
  cat_id: string;
}

export type TUnlikedCat = {
  cat_id: string;
}

export type TFavourites = IFavourite[];