import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import $api from "../http";
import { Company } from "../models/company";
interface CompaniesState {
  data: Company[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CompaniesState = {
  data: [],
  status: "idle",
  error: null,
};
export const fetchCompanies = createAsyncThunk<Company[]>(
  'companies/fetchCompanies',
  async () => {
    const response = await $api.get(`/Products`);
    return response.data;
  }
);

export const addCompany = createAsyncThunk<Company, { name: string, address: string }>(
  'companies/addCompany',
  async (newCompany, { dispatch }) => {
    const response = await $api.post(`/Products`, newCompany);
    dispatch(fetchCompanies());
    return response.data;
  }
);

export const updateCompany = createAsyncThunk<Company, { id: number, data: { name: string, address: string } }>(
  'companies/updateCompany',
  async ({ id, data }, { dispatch }) => {
    const response = await $api.put(`/Products/${id}`, data);
    dispatch(fetchCompanies());
    return response.data;
  }
);
export const deleteCompanies = createAsyncThunk<number[], number[]>(
  'companies/deleteCompanies',
  async (ids: number[], { dispatch }) => {
    await Promise.all(ids.map(id => $api.delete(`/Products/${id}`)));
    dispatch(fetchCompanies());
    return ids;
  }
);



const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<Company[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch companies';
      })
      .addCase(addCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.status = 'succeeded';
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add company';
      })
      .addCase(updateCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.status = 'succeeded';
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update company';
      })
      .addCase(deleteCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCompanies.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.status = 'succeeded';
        state.data = state.data.filter(company => !action.payload.includes(company.id));
      })
      .addCase(deleteCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete companies';
      });
      
  }
});

export default companySlice.reducer;
