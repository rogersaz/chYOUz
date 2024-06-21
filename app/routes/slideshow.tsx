import { useCallback } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import Yup from 'yup';
import { createClient } from '@supabase/supabase-js';
import { Box, Button, FormControl, Input, Select, VStack } from '@chakra-ui/react';

// Create a new Superbase client instance
const supabase = createClient('https://xzlaojqvnvuvywshviso.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MjI1MzAsImV4cCI6MjAzNDQ5ODUzMH0.qsk6kRv8uKts0K6-3da02Kpmsee50KAhlHiWAGsms5U');

// Define the initial values and validation schema for the form
const initialValues = {
  name: '',
  email: '',
  keywords: '',
  genre: '',
  voiceType: '',
  singer: '',
  photos: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  keywords: Yup.string().max(50, 'Keywords must be less than 50 characters').required('Keywords are required'),
  genre: Yup.string().required('Music genre is required'),
  voiceType: Yup.string().required('Voice type is required'),
  singer: Yup.string().required('Singer is required'),
  photos: Yup.array().max(25, 'Maximum 25 photos allowed'),
});

// Define the dropdown component
const Dropdown = ({ label, options, name }) => (
  <FormControl>
    <Select name={name} label={label}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </Select>
  </FormControl>
);

// Define the file upload component
const FileUpload = ({ name }) => {
  const onFileChange = useCallback((event) => {
    const files = Array.from(event.target.files);
    setFieldValue(name, files);
  }, []);

  return (
    <FormControl>
      <Input type="file" name={name} multiple onChange={onFileChange} />
    </FormControl>
  );
};

// Define the onSubmit function
const onSubmit = async (values) => {
  const { error } = await supabase.from('slideshow').insert(values);
  if (error) console.error(error);
  else console.log('Form data submitted successfully');
};

// Render the form
export default function Slideshow() {
  return (
    <VStack spacing={4} align="flex-start">
      <h1>Upload Slideshow</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <Form>
            <Field name="name">
              {({ field }) => (
                <FormControl>
                  <Input type="text" name={field.name} onChange={handleChange} onBlur={handleBlur} value={field.value} placeholder="Name" />
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field }) => (
                <FormControl>
                  <Input type="email" name={field.name} onChange={handleChange} onBlur={handleBlur} value={field.value} placeholder="Email Address" />
                </FormControl>
              )}
            </Field>
            <Field name="keywords">
              {({ field }) => (
                <FormControl>
                  <Input type="text" name={field.name} onChange={handleChange} onBlur={handleBlur} value={field.value} placeholder="Short Song Keywords or Phrase" />
                </FormControl>
              )}
            </Field>
            <Dropdown label="Music Genre" options={['Bluegrass', 'Country', 'Folk', 'Popular', 'Pop', 'Dance Pop', 'Pop Rock', 'RnB', 'Rock', 'Classic Rock', 'Blues Rock', 'Glam Rock', 'Hardcore Punk', 'Indie', 'Industrial Rock', 'Punk', 'Rock', 'Skate Rock', 'Skatecore']} name="genre" />
            <Dropdown label="Voice Type" options={['A Cappella', 'Dispassionate', 'Emotional', 'Ethereal', 'Gregorian chant', 'Hindustani', 'Lounge Singer', 'Melismatic', 'Monotone', 'Narration', 'Resonant', 'Spoken Word', 'Sultry', 'Torchy', 'Vocaloid']} name="voiceType" />
            <Dropdown label="Singer" options={['Male', 'Female']} name="singer" />
            <FieldArray name="photos">
              {({ push }) => (
                <>
                  <FileUpload name="photos" />
                  <Button type="button" onClick={() => push(null)}>Add Photo</Button>
                </>
              )}
            </FieldArray>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </VStack>
  );
}
