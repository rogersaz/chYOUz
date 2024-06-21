import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabaseClient';

const SlideShow = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [songKeywords, setSongKeywords] = useState('');
  const [musicGenre, setMusicGenre] = useState('');
  const [voiceType, setVoiceType] = useState('');
  const [singer, setSinger] = useState('');
  const [photos, setPhotos] = useState([]);

  const musicGenreOptions = [
    'Bluegrass',
    'Country',
    'Folk',
    'Popular',
    'Pop',
    'Dance Pop',
    'Pop Rock',
    'RnB',
    'Rock',
    'Classic Rock',
    'Blues Rock',
    'Glam Rock',
    'Hardcore Punk',
    'Indie',
    'Industrial Rock',
    'Punk',
    'Rock',
    'Skate Rock',
    'Skatecore',
  ];

  const voiceTypeOptions = [
    'A Cappella',
    'Dispassionate',
    'Emotional',
    'Ethereal',
    'Gregorian chant',
    'Hindustani',
    'Lounge Singer',
    'Melismatic',
    'Monotone',
    'Narration',
    'Resonant',
    'Spoken Word',
    'Sultry',
    'Torchy',
    'Vocaloid',
  ];

  const singerOptions = ['Male', 'Female'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setPhotos([...photos, ...result.assets]);
    }
  };

  const uploadData = async () => {
    try {
      const { data, error } = await supabase.from('slideshow').insert([
        {
          name,
          email,
          song_keywords: songKeywords,
          music_genre: musicGenre,
          voice_type: voiceType,
          singer,
          photos: photos.map((photo) => photo.uri),
        },
      ]);

      if (error) {
        throw error;
      }

      alert('Data uploaded successfully!');
    } catch (error) {
      alert('Error uploading data:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Name:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Email Address:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email address"
        keyboardType="email-address"
      />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Short Song Keywords or Phrase:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '
