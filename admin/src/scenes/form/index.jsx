import { Formik } from "formik";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import bcrypt from "bcryptjs";
import { base_url } from "../../../../render";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const mappedValues = {
        first_name: values.firstName,
        last_name: values.lastName,
        Username: values.username,
        email: values.email,
        password: hashedPassword,
        age: values.age,
        phone_number: values.contact,
        access_level: values.access_level,
        photo: values.photo,
      };
  
      const response = await fetch(`${base_url}/api/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedValues),
      });
  
      const responseData = await response.json();
      console.log("Backend Response:", responseData);  // Log the response data
  
      if (response.ok) {
        toast.success("User created successfully!");
        resetForm();
      } else {
        toast.error(`Failed to create user. Error: ${responseData.error || 'Unknown'}`);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };
  

  return (
    <Box m="20px" p="5px">
      <ToastContainer />
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Photo Url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.photo}
                name="photo"
                error={!!touched.photo && !!errors.photo}
                helperText={touched.photo && errors.photo}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                sx={{ m: 1, minWidth: 200 }}
                error={!!touched.access_level && !!errors.access_level}
              >
                <InputLabel id="demo-simple-select-label">
                  Access Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.access_level}
                  variant="filled"
                  label="Access Level"
                  name="access_level"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ gridColumn: "span 4" }}
                  required
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.access_level && errors.access_level}
                </FormHelperText>{" "}
                {/* Display error here */}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  age: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  access_level: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  contact: "",
  username: "",
  password: "",
  photo: "",
  access_level: "employee",
};

export default Form;
