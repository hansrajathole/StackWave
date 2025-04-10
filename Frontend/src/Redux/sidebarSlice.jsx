import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar', // the slice name
  initialState: {
    isOpen: false, // initial state
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen; // toggles the sidebar
    },
  },
});

// exporting the action and reducer
export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
