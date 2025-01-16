import * as React from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddItem = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // Mapping Formik values to the backend schema
      const mappedValues = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        availability: values.availability,
      };

      const response = await fetch("http://localhost:5000/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedValues), // Send mapped values to the backend
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item added successfully:", data);
        alert("Item created successfully!");
        resetForm(); // Reset the form fields
      } else {
        const error = await response.json();
        console.error("Error creating item:", error);
        alert("Failed to create item. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <Box m="20px">
      <Header title="New Item" subtitle="Add a New Item to a Menu" />

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
                type="hidden"
                label=""
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
                name="id"
                error={!!touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Item Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl
                sx={{ m: 1, minWidth: 200 }}
                error={!!touched.category && !!errors.category}
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.category}
                  variant="filled"
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="Appetizer">Appetizer</MenuItem>
                  <MenuItem value="Main Dish">Main Dish</MenuItem>
                  <MenuItem value="Side Dish">Side Dish</MenuItem>
                  <MenuItem value="Beverage">Beverage</MenuItem>
                  <MenuItem value="Soup">Soup</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.category && errors.category}
                </FormHelperText>{" "}
                {/* Display error here */}
              </FormControl>
              <br />
              <FormControl
                sx={{ m: 1, minWidth: 100 }}
                error={!!touched.availability && !!errors.availability}
              >
                <InputLabel id="demo-simple-select-autowidth-label">
                  Availability
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  variant="filled"
                  value={values.availability}
                  label="Availability"
                  name="availability"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ gridColumn: "span 4" }}
                  autoWidth
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.availability && errors.availability}
                </FormHelperText>{" "}
                {/* Display error here */}
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Item
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  id: yup.string(),
  description: yup.string().required("required"),
  price: yup.number().required("required").positive("Must be positive"),
  category: yup.string().required("required"),
  availability: yup.boolean(),
});

const initialValues = {
  id: "",
  name: "",
  description: "",
  price: "",
  category: "",
  availability: true,
};

export default AddItem;
