import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetColors = createAsyncThunk("ColorsSlice/GetColors", async () => {
  const res = await fetch("/api/colors");
  const data = await res.json();
  console.log(data);
  return data;
});
export const AddNewColor = createAsyncThunk(
  "ColorsSlice/AddNewColor",
  async (DataOpject) => {
    const response = await fetch("/api/colors", {
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
export const DeleteColor = createAsyncThunk(
  "ColorsSlice/DeleteColor",
  async (id) => {
    const response = await fetch(`/api/colors/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete color");
    }
    return id; // Return the product ID that was deleted
  }
);
export const ColorsSlice = createSlice({
  initialState: {
    colors: [],
    loading: false,
  },
  name: "ColorsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetColors.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(GetColors.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddNewColor.fulfilled, (state, action) => {
      state.colors.push(action.payload);
    });
    builder.addCase(DeleteColor.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = state.colors.filter(
        (color) => color.id !== action.payload
      );
    });
  },
});

export const {} = ColorsSlice.actions;

export default ColorsSlice;
