import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    //DATA
ordenesDataArr: [],
selectedOrdenesData: null,
selectedOrdenesDetalleData: null

  //SELECCIONES
  //instituteDataObj: {},
    //BOOLEANS/VARIABLES
}
const OrdenesSlice = createSlice({
name: 'ORDENES',
initialState,
reducers: {
SET_DATA_ORDENES: (state, action) => {
                        console.log('<<REDUX-REDUCER>>:<<SET_DATA_ORDENES>>', action.payload);
//state.institutesDataArr = action.payload.institutesDataArr;
state.ordenesDataArr = action.payload
},
SET_SELECTED_ORDENES_DATA: (state, action) => {
    state.selectedOrdenesData = action.payload;
},
SET_SELECTED_ORDENES_DETALLE_DATA: (state, action) => {
    state.selectedOrdenesDetalleData = action.payload;
},
    }
}
);
export const {
SET_DATA_ORDENES,
SET_SELECTED_ORDENES_DATA,
SET_SELECTED_ORDENES_DETALLE_DATA
    //ADD_PRODUCT_SELECTED,
    //SWITCH_STATE,
} = OrdenesSlice.actions;
export default OrdenesSlice.reducer;