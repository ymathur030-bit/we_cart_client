import { createSlice } from '@reduxjs/toolkit'

const savedCart = localStorage.getItem('cart');


const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart
    ? JSON.parse(savedCart)
    : [],
  reducers: {

    addtocart: (state, action) => {
      // console.log("add to cart called successfully and product is", action.payload)
      const product = action.payload;

      const productExists = state.find((item) => item.id === product.id);

      if (productExists) {
        productExists.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    removefromcart: (state, action) => {
      const product = action.payload;

      const productExists = state.find((item) => item.id === product.id);

      if (productExists) {
        if (productExists.quantity > 1) {
          productExists.quantity -= 1;
        } else {
          state.splice(state.indexOf(productExists), 1);
        }
      }

    },
    clearcart: (state, action) => {
      console.log("clear cart called successfully")
      // state.splice(0, state.length);
      localStorage.setItem('cart', JSON.stringify([]));
      return [];
    }

  }
});

export const { addtocart, removefromcart, clearcart } = cartSlice.actions
export default cartSlice.reducer;
