import { configureStore } from "@reduxjs/toolkit";
import OrdenesSlice from "../slices/OrdenesSlice";
//import productosSlice from "../slices/usuarios/productosSlice";
const store = configureStore({
    reducer: {
      ordenesReducer: OrdenesSlice,
      //productosSliceReducer: productosSlice,
    },
  });
 
  export default store;