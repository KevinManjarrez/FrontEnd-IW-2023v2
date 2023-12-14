//NOTA: Este archivo contiene funciones ASYNCRONAS
//que nos ayuda a obtener la respuesta del servidor
//y poder mandarla al SLICE y a su estado
import { getOrdenesAll } from './actions/OrdenesActions';
import { SET_DATA_ORDENES } from './slices/OrdenesSlice';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        dispatch(
            SET_DATA_ORDENES(
                //FIC: lo que esta comentado es para cuando se utiliza
                //un reducer que contedra un arreglo de colecciones
                //tal sera el caso como el de catalogos.
                //{
                    //institutesDataArr: await getOrdenesAll(),
                    await getOrdenesAll(),
                //}
            )
        )
    };
};