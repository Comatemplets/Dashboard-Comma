import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetCategory = createAsyncThunk(
  "CategorySlice/GetCategory",
  async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const AddNewCategory = createAsyncThunk(
  "CategorySlice/AddNewProduct",
  async (DataOpject) => {
    const response = await fetch("/api/categories", {
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

export const UpdateCategory = createAsyncThunk(
  "CategorySlice/UpdateCategory",
  async (DataOpject) => {
    const response = await fetch("/api/categories", {
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

export const DeleteCategory = createAsyncThunk(
  "CategorySlice/DeleteCategory",
  async (id) => {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    return id; // Return the product ID that was deleted
  }
);
export const CategorySlice = createSlice({
  initialState: {
    category: [],
    loading: false,
  },
  name: "CategorySlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(GetCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddNewCategory.fulfilled, (state, action) => {
      state.category.push(action.payload);
    });
    builder.addCase(DeleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = state.category.filter(
        (Category) => Category.id !== action.payload
      );
    });
    builder.addCase(UpdateCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export const {} = CategorySlice.actions;

export default CategorySlice;
