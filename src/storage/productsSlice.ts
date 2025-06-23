import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductFilter } from '../models/types';
import { client } from '../utils';
import type { RootState } from './store';

type ProductsState = {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  hasFiltered: boolean; 
};

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  hasFiltered: false,
};

export const loadProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/loadProducts',
  async (_, thunkAPI) => {
    try {
      const products = (await client.getProducts()).sort((a,b) => {
        return a.price > b.price ? 1 : -1;
      });;
      return products;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loadFilteredProducts = createAsyncThunk<Product[], ProductFilter, { rejectValue: string }>(
  'products/loadFilteredProducts',
  async (filter, thunkAPI) => {
    try {
      const products = (await client.getFilteredProducts(filter)).sort((a,b) => {
        return a.price > b.price ? 1 : -1;
      });
      return products;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts(state) {
      state.items = [];
      state.filteredItems = [];
      state.error = null;
      state.hasFiltered = false;
    },
    clearFilteredProducts(state) {
      state.filteredItems = [];
      state.hasFiltered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hasFiltered = false;
      })
      .addCase(loadFilteredProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.filteredItems = action.payload;
        state.loading = false;
        state.hasFiltered = true;
      })
      .addCase(loadFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasFiltered = false;
      });
  },
});

export const selectProducts = (state: RootState) => state.products.items;
export const selectFilteredProducts = (state: RootState) => state.products.filteredItems;
export const selectHasFiltered = (state: RootState) => state.products.hasFiltered;
export const selectLoading = (state: RootState) => state.products.loading;
export const { clearProducts, clearFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;