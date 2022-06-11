import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type Toast = {
  open: boolean;
  autoHideDuration?: number | null;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

export type GeneralStateType = {
  loader: string[];
  toast: Toast;
};

const initialState: GeneralStateType = {
  loader: [],
  toast: {
    open: false,
    message: '',
    severity: 'success',
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {

    showLoader(state, action: PayloadAction<{ action: string }>) {
      state.loader.push(action?.payload?.action);
    },
    hideLoader(state, action: PayloadAction<{ action: string }>) {
      state.loader = state.loader.filter((loadingAction: string) => loadingAction !== action?.payload?.action);
    },
    showToast(state, action: PayloadAction<GeneralStateType['toast']>) {
      state.toast = action.payload;
    },
    hideToast(state) {
      state.toast = {
        open: false,
        message: '',
        severity: state.toast.severity,
      };
    }
  },
});

export const {
  hideLoader,
  showLoader,
  showToast,
  hideToast,
} = generalSlice.actions;

export default generalSlice.reducer;
