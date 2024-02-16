import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = "cartData";

export interface CardItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CardItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
     clean : (state) => {
        state.items = []
     },
     delete: (state, action: PayloadAction<number>) => {
        state.items= state.items.filter(i => i.id !== action.payload);
     },      
     remove: (state, action: PayloadAction<number>) => {
        const existed = state.items.find( items => items.id === action.payload);
        if (!existed) {
            return;
        }
            if (existed.count === 1) {
                state.items = state.items.filter(i => i.id !== action.payload)
            } else {
                state.items.map(items =>{ 
                    if(items.id === action.payload){
                        items.count -= 1;
                    }
                    return items;
                 });
               return;
            }
        
    },
     add:  (state, action: PayloadAction<number>) => {
         const existed = state.items.find( items => items.id === action.payload);
         if (!existed) {
            state.items.push({ id: action.payload, count: 1 });
            return;
         }
         state.items.map(items =>{ 
            if(items.id === action.payload){
                items.count += 1;
            }
            return items;
         });
      }
    }
  });
  
  export default cartSlice.reducer;
  export const cartActions = cartSlice.actions;