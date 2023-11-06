import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Item, { IItemsProps } from '../../components/Item/Item'

export interface CartState {
    cart: CartItems[]
}

const initialState: CartState = {
    cart: []
}


export interface CartItems {
    "_id": number,
    "name": string,
    "price": number,
    "brand": string,
    "img": string,
    "count": number
}







export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartItems>) => {
            if (state.cart.some((item) => item._id === action.payload._id)) {
                const findProduct = state.cart.find(item => item._id === action.payload._id)
                if (findProduct) {
                    findProduct.count++
                }
                
            }
            else {
                state.cart.push(action.payload)
            }
            

        },

        removeItem: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => (item._id !== action.payload))
        },


        buy : (state) => {
            
        }

    },
})

// Action creators are generated for each case reducer function
export const { addCart, removeItem } = counterSlice.actions

export default counterSlice.reducer