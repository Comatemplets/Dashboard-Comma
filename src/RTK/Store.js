import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import CategorySlice from "./Slices/CategorySlice";
import ColorsSlice from "./Slices/ColorSlice";
import BadgesSlice from "./Slices/BadgesSlice";
import OrdersSlice from "./Slices/OrdersSlice";

export const Store = configureStore({
  reducer: {
    products: ProductSlice.reducer,
    category: CategorySlice.reducer,
    colors: ColorsSlice.reducer,
    badges: BadgesSlice.reducer,
    orders: OrdersSlice.reducer,
  },
});
