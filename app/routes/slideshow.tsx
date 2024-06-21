import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

const ChyouzSlideshow: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [songKeywords, setSongKeywords] = useState('');
  const [musicGenre, setMusicGenre] = useState('');
  const [voiceType, setVoiceType] = useState('');
  const [singer, setSinger] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Upload photos to Supabase storage
    const uploadPromises = photos.map(async (photo) => {
      const { data, error } = await supabase.storage
        .from('photos')
        .upload(`${name}_${Date.now()}.jpg`, photo);
      if (error) {
        console.error('Error uploading photo:', error.message);
      }
      return data?.path;
    });
    const photoPaths = await Promise.all(uploadPromises);

    // Insert data into Supabase database
    const { error } = await supabase.from('chyouz_slideshow').insert({
      name,
      email,
      song_keywords: songKeywords,
      music_genre: musicGenre,
      voice_type: voiceType,
      singer,
      photos: photoPaths,
    });

    if (error) {
      console.error('Error saving data:', error.message);
    } else {
      navigate('/success');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">chYOUz Slideshow</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="songKeywords">
            Short Song Keywords or Phrase
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="songKeywords"
            type="text"
            placeholder="Enter song keywords or phrase"
            value={songKeywords}
            onChange={(e) => setSongKeywords(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block

          }
