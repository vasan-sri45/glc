// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { personalApi } from './personalService'; 

// export const submitPersonalInfo = createAsyncThunk(
//   'personalInfo/submitPersonalInfo', 
//   async (personalData, { rejectWithValue }) => {
//     try {
//       const response = await personalApi.createInfo(personalData); 
//       return response; 
//     } catch (error) {
//       return rejectWithValue(error); 
//     }
//   }
// );

// export const fetchPersonalInfo = createAsyncThunk(
//   'personalInfo/fetch', // Corrected, consistent naming
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await personalApi.getMyPersonal();
//       return response;
//     } catch (error) {
//       // Return a serializable error object or message
//       return rejectWithValue(error.response?.data || { message: 'Failed to fetch data.' });
//     }
//   }
// );

// export const updatePersonalInfo = createAsyncThunk(
//   'personalInfo/update',
//   async (updateData, { rejectWithValue }) => {
//     try {
//       // The user ID is handled by the backend via token, so we don't need to pass it
//       return await personalApi.updateInfo(updateData);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: 'Failed to update data' });
//     }
//   }
// );

// const personalInfoSlice = createSlice({
//   name: 'personalInfo', 
//   initialState: {
//     data: null, 
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     resetPersonalInfoState: (state) => {
//       state.data = null;
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitPersonalInfo.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(submitPersonalInfo.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//         state.error = null;
//       })
//       .addCase(submitPersonalInfo.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload; 
//       })
//       .addCase(fetchPersonalInfo.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const payload = action.payload;
//         state.data = payload?.data && typeof payload.data === 'object'
//           ? payload.data
//           : payload ?? null;
//         state.error = null;
//       })
//       .addCase(fetchPersonalInfo.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//        .addCase(updatePersonalInfo.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(updatePersonalInfo.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//         state.error = null;
//       })
//       .addCase(updatePersonalInfo.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetPersonalInfoState } = personalInfoSlice.actions;

// export default personalInfoSlice.reducer;


// // store/slices/personal/personalSlice.js
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import {personalApi} from './personalService';

// // const initialState = {
// //   status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
// //   error: null,      // always a string or null
// //   data: null,
// // };

// // export const fetchPersonalInfo = createAsyncThunk(
// //   'personal/fetch',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const data = await personalApi.getMyPersonal();
// //       return data;
// //     } catch (err) {
// //       const message = err?.response?.data?.message ?? err?.message ?? 'Failed to load personal info';
// //       return rejectWithValue(message);
// //     }
// //   }
// // );

// // export const submitPersonalInfo = createAsyncThunk(
// //   'personal/create',
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       const data = await personalApi.createInfo(payload);
// //       return data;
// //     } catch (err) {
// //       const message = err?.response?.data?.message ?? err?.message ?? 'Failed to create personal info';
// //       return rejectWithValue(message);
// //     }
// //   }
// // );

// // export const updatePersonalInfo = createAsyncThunk(
// //   'personal/update',
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       const data = await personalApi.updateInfo(payload);
// //       return data;
// //     } catch (err) {
// //       const message = err?.response?.data?.message ?? err?.message ?? 'Failed to update personal info';
// //       return rejectWithValue(message);
// //     }
// //   }
// // );

// // const personalSlice = createSlice({
// //   name: 'personalInfo',
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     const toMsg = (action, fallback) =>
// //       String(action.payload ?? action.error?.message ?? fallback);

// //     builder
// //       // fetch
// //       .addCase(fetchPersonalInfo.pending, (state) => {
// //         state.status = 'loading';
// //         state.error = null;
// //       })
// //       .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.data = action.payload ?? {};
// //         state.error = null;
// //       })
// //       .addCase(fetchPersonalInfo.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = toMsg(action, 'Failed to load personal info');
// //       })

// //       // create
// //       .addCase(submitPersonalInfo.pending, (state) => {
// //         state.status = 'loading';
// //         state.error = null;
// //       })
// //       .addCase(submitPersonalInfo.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.data = action.payload ?? {};
// //         state.error = null;
// //       })
// //       .addCase(submitPersonalInfo.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = toMsg(action, 'Failed to create personal info');
// //       })

// //       // update
// //       .addCase(updatePersonalInfo.pending, (state) => {
// //         state.status = 'loading';
// //         state.error = null;
// //       })
// //       .addCase(updatePersonalInfo.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.data = action.payload ?? state.data ?? {};
// //         state.error = null;
// //       })
// //       .addCase(updatePersonalInfo.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = toMsg(action, 'Failed to update personal info');
// //       });
// //   },
// // });

// // export default personalSlice.reducer;


// personalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { personalApi } from './personalService';

export const fetchPersonalInfo = createAsyncThunk(
  'personal/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await personalApi.getMyPersonal();
      return res; // service should return axios .data already
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message ?? 'Failed to fetch data';
      return rejectWithValue({ message, status });
    }
  },
  {
    condition: (_, { getState }) => {
      const s = getState().personalInfo;
      return s.status === 'idle' && !s.notFound;
    },
  }
);

export const submitPersonalInfo = createAsyncThunk(
  'personal/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await personalApi.createInfo(payload);
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message ?? 'Failed to create data';
      return rejectWithValue({ message, status });
    }
  }
);

export const updatePersonalInfo = createAsyncThunk(
  'personal/update',
  async (payload, { rejectWithValue }) => {
    try {
      return await personalApi.updateInfo(payload);
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message ?? 'Failed to update data';
      return rejectWithValue({ message, status });
    }
  }
);

const initialState = { data: null, status: 'idle', error: null, notFound: false };

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    resetPersonalInfoState(state) {
      state.data = null; state.status = 'idle'; state.error = null; state.notFound = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalInfo.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        const payload = action.payload;
        state.status = 'succeeded';
        state.data = payload?.data && typeof payload.data === 'object' ? payload.data : payload ?? null;
        state.error = null;
        state.notFound = false;
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || { message: 'Failed to fetch data' };
        state.notFound = state.error?.status === 404;
      })
      .addCase(submitPersonalInfo.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(submitPersonalInfo.fulfilled, (state, action) => { state.status = 'succeeded'; state.data = action.payload; state.error = null; state.notFound = false; })
      .addCase(submitPersonalInfo.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || { message: 'Failed to create data' }; })
      .addCase(updatePersonalInfo.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(updatePersonalInfo.fulfilled, (state, action) => { state.status = 'succeeded'; state.data = action.payload; state.error = null; })
      .addCase(updatePersonalInfo.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || { message: 'Failed to update data' }; });
  },
});

export const { resetPersonalInfoState } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
