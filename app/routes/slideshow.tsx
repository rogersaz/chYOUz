import React from 'react';
import { View, Text, TextInput, Picker, Button } from 'react-native';
import * as Superbase from 'superbase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MailComposer from 'expo-mail-composer';

const optionsMusicGenre = [
  'Bluegrass', 'Country', 'Folk', 'Popular', 'Pop', 'Dance Pop', 'Pop Rock', 'RnB', 'Rock', 'Classic Rock', 'Blues Rock',
  'Glam Rock', 'Hardcore Punk', 'Indie', 'Industrial Rock', 'Punk', 'Rock', 'Skate Rock', 'Skatecore'
];

const optionsVoiceType = [
  'A Cappella', 'Dispassionate', 'Emotional', 'Ethereal', 'Gregorian chant', 'Hindustani', 'Lounge Singer',
  'Melismatic', 'Monotone', 'Narration', 'Resonant', 'Spoken Word', 'Sultry', 'Torchy', 'Vocaloid'
];

const NewMarkPage = () => {
  const [name, setName] = React.useState('');
  const [songKeywords, setSongKeywords] = React.useState('');
  const [musicGenre, setMusicGenre] = React.useState(optionsMusicGenre[0]);
  const [voiceType, setVoiceType] = React.useState(optionsVoiceType[0]);
  const [singerGender, setSingerGender] = React.useState('');
  const [photos, setPhotos] = React.useState([]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleSongKeywordsChange = (text) => {
    setSongKeywords(text);
  };

  const handleMusicGenreChange = (itemValue) => {
    setMusicGenre(itemValue);
  };

  const handleVoiceTypeChange = (itemValue) => {
    setVoiceType(itemValue);
  };

  const handleSingerGenderChange = (gender) => {
    setSingerGender(gender);
  };

  const handleUploadPhotos = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhotos([...photos, result.uri]);
      }
    }
  };

  const handleSubmit = async () => {
    // Upload data to Superbase database
    const client = new Superbase.createClient('https://xzlaojqvnvuvywshviso.supabase.co', '4xXlwsl45DSu6eumUSXddudfFaTtwICHdrSGzIdCkFugMxn98CfomjHxnr+AuW+/bo30N6m2MNdi8tPeD5ETSQ==');
    const { data, error } = await client.from('customers').insert([
      { name, songKeywords, musicGenre, voiceType, singerGender, photos },
    ]);

    if (error) {
      console.error('Error uploading data to Superbase:', error);
    } else {
      // Send email
      const emailSubject = 'New Customer Details';
      const emailBody = `Name: ${name}\nSong Keywords: ${songKeywords}\nMusic Genre: ${musicGenre}\nVoice Type: ${voiceType}\nSinger Gender: ${singerGender}\nPhotos: ${photos.join(', ')}`;

      MailComposer.composeAsync({
        recipients: ['markymarkaz@gmail.com'],
        subject: emailSubject,
        body: emailBody,
      });
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
      />
      
      <Text>Short Song Keywords:</Text>
      <TextInput
        value={songKeywords}
        onChangeText={handleSongKeywordsChange}
      />
      
      <Text>Music Genre:</Text>
      <Picker
        selectedValue={musicGenre}
        onValueChange={handleMusicGenreChange}
      >
        {optionsMusicGenre.map((genre, index) => (
          <Picker.Item key={index} label={genre} value={genre} />
        ))}
      </Picker>
      
      <Text>Voice Type:</Text>
      <Picker
        selectedValue={voiceType}
        onValueChange={handleVoiceTypeChange}
      >
        {optionsVoiceType.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker>
      
      <Text>Male or Female singer:</Text>
      <TextInput
        value={singerGender}
        onChangeText={handleSingerGenderChange}
      />
      
      <Button title="Upload Photos" onPress={handleUploadPhotos} />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default NewMarkPage;
