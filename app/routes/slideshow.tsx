import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzlaojqvnvuvywshviso.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MjI1MzAsImV4cCI6MjAzNDQ5ODUzMH0.qsk6kRv8uKts0K6-3da02Kpmsee50KAhlHiWAGsms5U';
const supabase = createClient(supabaseUrl, supabaseKey);

const Slideshow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    keywords: '',
    genre: '',
    voiceType: '',
    singer: '',
    photos: [] as File[]
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({
        ...formData,
        photos: Array.from(event.target.files)
      });
    }
  };

  const uploadPhotos = async (photos: File[]) => {
    const uploadedPhotos = [];
    for (const photo of photos) {
      const { data, error } = await supabase.storage
        .from('photos')
        .upload(`public/${photo.name}`, photo);
      if (error) throw error;
      uploadedPhotos.push(data.Key);
    }
    return uploadedPhotos;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const uploadedPhotos = await uploadPhotos(formData.photos);

      const { data, error } = await supabase.from('slideshow').insert([{
        name: formData.name,
        email: formData.email,
        keywords: formData.keywords,
        genre: formData.genre,
        voiceType: formData.voiceType,
        singer: formData.singer,
        photos: uploadedPhotos
      }]);

      if (error) {
        throw error;
      }

      alert('Data submitted successfully!');
    } catch (error: any) {
      console.error('Error uploading data:', error.message);
      alert(`Error uploading data: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Slideshow Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Short Song Keywords or Phrase:
          <input type="text" name="keywords" value={formData.keywords} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Music Genre:
          <select name="genre" value={formData.genre} onChange={handleInputChange} required>
            <option value="">Select Genre</option>
            <option value="Bluegrass">Bluegrass</option>
            <option value="Country">Country</option>
            <option value="Folk">Folk</option>
            <option value="Popular">Popular</option>
            <option value="Pop">Pop</option>
            <option value="Dance Pop">Dance Pop</option>
            <option value="Pop Rock">Pop Rock</option>
            <option value="RnB">RnB</option>
            <option value="Rock">Rock</option>
            <option value="Classic Rock">Classic Rock</option>
            <option value="Blues Rock">Blues Rock</option>
            <option value="Glam Rock">Glam Rock</option>
            <option value="Hardcore Punk">Hardcore Punk</option>
            <option value="Indie">Indie</option>
            <option value="Industrial Rock">Industrial Rock</option>
            <option value="Punk">Punk</option>
            <option value="Skate Rock">Skate Rock</option>
            <option value="Skatecore">Skatecore</option>
          </select>
        </label>
        <br />
        <label>
          Voice Type:
          <select name="voiceType" value={formData.voiceType} onChange={handleInputChange} required>
            <option value="">Select Voice Type</option>
            <option value="A Cappella">A Cappella</option>
            <option value="Dispassionate">Dispassionate</option>
            <option value="Emotional">Emotional</option>
            <option value="Ethereal">Ethereal</option>
            <option value="Gregorian chant">Gregorian chant</option>
            <option value="Hindustani">Hindustani</option>
            <option value="Lounge Singer">Lounge Singer</option>
            <option value="Melismatic">Melismatic</option>
            <option value="Monotone">Monotone</option>
            <option value="Narration">Narration</option>
            <option value="Resonant">Resonant</option>
            <option value="Spoken Word">Spoken Word</option>
            <option value="Sultry">Sultry</option>
            <option value="Torchy">Torchy</option>
            <option value="Vocaloid">Vocaloid</option>
          </select>
        </label>
        <br />
        <label>
          Singer:
          <select name="singer" value={formData.singer} onChange={handleInputChange} required>
            <option value="">Select Singer</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Upload Photos (max 25):
          <input type="file" name="photos" onChange={handleFileChange} multiple accept="image/*" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Slideshow;
