import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzlaojqvnvuvywshviso.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODkyMjUzMCwiZXhwIjoyMDM0NDk4NTMwfQ.4a728R5ZXAx3S25lBN80WzKn476NQCOrHXnDKz_xeFM'; // Replace this with your actual Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);


interface FormData {
  customerName: string;
  email: string;
  keywords: string[];
  songGenre: string[];
  singerVoice: 'male' | 'female';
  photos: File[];
}

const SlideshowOrder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    email: '',
    keywords: [],
    songGenre: [],
    singerVoice: 'male',
    photos: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, files } = event.target;
    let newValue: string | string[] | File[];

    if (type === 'checkbox') {
      newValue = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
    } else if (type === 'file') {
      newValue = Array.from(files || []);
    } else {
      newValue = value;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { error } = await supabase.from('slideshow_orders').insert(formData);

      if (error) {
        console.error('Error saving form data:', error);
      } else {
        console.log('Form data saved successfully');
        setFormData({
          customerName: '',
          email: '',
          keywords: [],
          songGenre: [],
          singerVoice: 'male',
          photos: [],
        });
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerName" className="block font-medium mb-2">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-
