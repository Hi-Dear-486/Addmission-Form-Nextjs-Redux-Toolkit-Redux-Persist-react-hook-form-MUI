"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Typography,
  Paper,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addmissionField,
  selectStateData,
} from "../store/slices/addmissionForm";
import { format, parseISO } from "date-fns";
import parsePhoneNumberFromString from "libphonenumber-js";
import { getCurrentDate } from "../utils/other";

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "100vh",
}));

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  tel: Yup.string().test(
    "is-valid-phone",
    "Phone number is not valid",
    (value) => {
      if (!value) return false; // Return false if the value is empty
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber && phoneNumber.isValid();
    }
  ),
  admissionDate: Yup.date().typeError(
    "The date of admission must be a valid date"
  ),
  course: Yup.object().nullable().required("Course selection is required"),
  gender: Yup.string().required("Gender is required"),
  checkbox: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

const Admissionform = () => {
  const { formData } = useSelector(selectStateData);

  console.log("check the format of date", formData.admissionDate);
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formData,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const [courses, setCourses] = useState([
    { title: "Computer Science" },
    { title: "Mechanical Engineering" },
    { title: "Electrical Engineering" },
    { title: "Civil Engineering" },
    { title: "Mathematics" },
    { title: "Physics" },
  ]);

  const onSubmit = (data) => {
    try {
      // Convert admissionDate to the desired format before dispatching
      if (data.admissionDate) {
        data.admissionDate = format(new Date(data.admissionDate), "MM/dd/yyyy");
      }
      dispatch(addmissionField(data));
      Swal.fire({
        icon: "success",
        title: "Submission Successful",
        text: "Your data has been submitted successfully!",
        confirmButtonText: "Ok",
      }).then(() => {
        reset();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your data. Please try again.",
        confirmButtonText: "Ok",
      });
    }
  };

  const onError = (errors) => {
    const errorMessages = Object.values(errors).map(({ message }) => message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessages[0],
      confirmButtonText: "OK",
    });
  };

  return (
    <FormProvider {...methods}>
      <ContainerStyled>
        <Grid container spacing={3} style={{ width: "100%" }}>
          {/* Form Section */}
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <PaperStyled
              elevation={3}
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <Typography variant="h4" gutterBottom align="center">
                Addmission Form
              </Typography>
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      {...register("firstName")}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      {...register("lastName")}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type="email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      type="tel"
                      {...register("tel")}
                      error={!!errors.tel}
                      helperText={errors.tel?.message}
                    />
                  </Grid>

                  {/* Date of Admission */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Date of Admission"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register("admissionDate")}
                      error={!!errors.admissionDate}
                      helperText={errors.admissionDate?.message}
                    />
                  </Grid>

                  {/* Course Selection */}
                  <Grid item xs={12}>
                    <Controller
                      name="course"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={courses}
                          getOptionLabel={(option) => option.title}
                          isOptionEqualToValue={(option, value) =>
                            option.title === value?.title
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Course"
                              variant="outlined"
                              error={!!errors.course}
                              helperText={errors.course?.message}
                            />
                          )}
                          onChange={(_, value) => field.onChange(value)}
                        />
                      )}
                    />
                  </Grid>

                  {/* Gender */}
                  <Grid item xs={12}>
                    <FormControl component="fieldset" error={!!errors.gender}>
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup row>
                        <FormControlLabel
                          value="male"
                          control={<Radio {...register("gender")} />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio {...register("gender")} />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio {...register("gender")} />}
                          label="Other"
                        />
                      </RadioGroup>
                      {errors.gender && (
                        <Typography color={"red"}>
                          {errors.gender.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Terms and Conditions */}
                  <Grid item xs={12}>
                    <FormControl error={!!errors.checkbox}>
                      <FormControlLabel
                        control={<Checkbox {...register("checkbox")} />}
                        label="I agree to all terms and conditions"
                      />
                      {errors.checkbox && (
                        <Typography color={"red"}>
                          {errors.checkbox.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </PaperStyled>
          </Grid>

          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <PaperStyled
              elevation={3}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                position: "relative",
              }}
            >
              <div
                style={{ position: "relative", height: "100%", width: "100%" }}
              >
                <Image
                  src="data:image/png;base64,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"
                  alt="Admission"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </PaperStyled>
          </Grid>
        </Grid>
      </ContainerStyled>
    </FormProvider>
  );
};

export default Admissionform;
