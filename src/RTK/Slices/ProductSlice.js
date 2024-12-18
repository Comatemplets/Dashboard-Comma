import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const GetProduct = createAsyncThunk(
  "ProductSlice/GetProduct",
  async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    console.log(data);
    return data;
  }
);
export const AddNewProduct = createAsyncThunk(
  "ProductSlice/AddNewProduct",
  async (DataOpject) => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataOpject),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);
export const DeleteProduct = createAsyncThunk(
  "ProductSlice/DeleteProduct",
  async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return id; // Return the product ID that was deleted
  }
);
export const UpdateProduct = createAsyncThunk(
  "ProductSlice/UpdateProduct",
  async (DataOpject) => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataOpject),
    });
    const data = await response.json();
    console.log("zanaty", data);
    return data;
  }
);

export const ProductSlice = createSlice({
  initialState: {
    products: [],
    loading: false,
  },
  name: "ProductSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(GetProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      console.log(state.products);
    });
    builder.addCase(AddNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload); // Add the new product to the existing array
    });
    builder.addCase(UpdateProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const {} = ProductSlice.actions;

export default ProductSlice;
