import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetOrders = createAsyncThunk("OrdersSlice/GetOrders", async () => {
  const res = await fetch("http://localhost:3000/api/orders");
  const data = await res.json();
  console.log(data);
  return data;
});
export const AddNewOrders = createAsyncThunk(
  "OrdersSlice/AddNewOrders",
  async (DataOpject) => {
    const response = await fetch("http://localhost:3000/api/orders", {
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
export const DeleteOrders = createAsyncThunk(
  "OrdersSlice/DeleteOrders",
  async (id) => {
    const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete Orders");
    }
    return id; // Return the product ID that was deleted
  }
);
export const OrdersSlice = createSlice({
  initialState: {
    orders: [],
    loading: false,
  },
  name: "OrdersSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(GetOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddNewOrders.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(DeleteOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter(
        (Orders) => Orders.id !== action.payload
      );
    });
  },
});

export const {} = OrdersSlice.actions;

export default OrdersSlice;
