import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: "filter",
    initialState: {    
        filters: { Paid: false, Free: false, ViewOnly: false },
        searchTerm: ""
    },
   reducers: {
    toggleFilter(state, action) {
      state[action.payload] = !state[action.payload];
    },
    resetFilters(state) {
      state.Paid = false;
      state.Free = false;
      state.ViewOnly = false;
      state.searchTerm = '';
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFiltersFromURL(state, action) {
      const activeFilters = action.payload;
      state.Paid = activeFilters.includes('Paid');
      state.Free = activeFilters.includes('Free');
      state.ViewOnly = activeFilters.includes('ViewOnly');
    }
  },
})
export const { toggleFilter, resetFilters, setSearchTerm, setFiltersFromURL } = filterSlice.actions;
export default filterSlice.reducer;