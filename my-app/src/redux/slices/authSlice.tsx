import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Item, { IItemsProps } from '../../components/Item/Item'
import { stat } from 'fs';


export interface IUser {
    _id : string,
    username: string;
    login: string;
    password: string;
} 

interface InitialStateUser {
    data: IUser | null;
}

const initialState: InitialStateUser = {
  data: null
};



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {


        setUser: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload
        },

        exitLogin : (state) => {
            state.data = null
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUser,exitLogin } = authSlice.actions

export default authSlice.reducer