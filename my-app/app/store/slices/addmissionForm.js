import { formatAdmissionDate, getCurrentDate } from "@/app/utils/other";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    tel: "+92",
    admissionDate: formatAdmissionDate(getCurrentDate()),
    course: { title: "" },
    gender: "",
    checkbox: "",
  },
};

const addmissionFormSlice = createSlice({
  name: "addmissionForm",
  initialState,
  reducers: {
    addmissionField: (state, { payload }) => {
      state.formData = {
        ...state.formData,
        ...payload,
      };
    },
  },
});

export const { addmissionField } = addmissionFormSlice.actions;
export const selectStateData = (state) => state.addmissionForm;
export default addmissionFormSlice;
