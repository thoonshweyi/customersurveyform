import { createSlice } from '@reduxjs/toolkit'

export const branchesSlice = createSlice({
  name: 'branches',
  initialState: {
    branch_id: 1
  },
  reducers: {
    setcurrentbranch: (state, action) => {
      state.branch_id = action.payload
    }
  }
})
// console.log(branchesSlice);
// Action creators are generated for each case reducer function
export const { setcurrentbranch } = branchesSlice.actions

export default branchesSlice.reducer