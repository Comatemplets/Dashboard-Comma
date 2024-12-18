import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetBadges = createAsyncThunk("BadgesSlice/GetBadges", async () => {
  const res = await fetch("http://localhost:3000/api/badges");
  const data = await res.json();
  console.log(data);
  return data;
});
export const AddNewBadge = createAsyncThunk(
  "BadgesSlice/AddNewBadge",
  async (DataOpject) => {
    const response = await fetch("http://localhost:3000/api/badges", {
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
export const DeleteBadge = createAsyncThunk(
  "BadgesSlice/DeleteBadge",
  async (id) => {
    const response = await fetch(`http://localhost:3000/api/badges/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete badge");
    }
    return id; // Return the product ID that was deleted
  }
);
export const BadgesSlice = createSlice({
  initialState: {
    badges: [],
    loading: false,
  },
  name: "BadgesSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBadges.fulfilled, (state, action) => {
      state.loading = false;
      state.badges = action.payload;
    });
    builder.addCase(GetBadges.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddNewBadge.fulfilled, (state, action) => {
      state.badges.push(action.payload);
    });
    builder.addCase(DeleteBadge.fulfilled, (state, action) => {
      state.loading = false;
      state.badges = state.badges.filter(
        (badge) => badge.id !== action.payload
      );
    });
  },
});

export const {} = BadgesSlice.actions;

export default BadgesSlice;
