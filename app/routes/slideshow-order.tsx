import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzlaojqvnvuvywshviso.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODkyMjUzMCwiZXhwIjoyMDM0NDk4NTMwfQ.4a728R5ZXAx3S25lBN80WzKn476NQCOrHXnDKz_xeFM'; // Replace this with your actual Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// app/routes/slideshow-order.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SlideshowOrder = () => {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    // Fetch and set the initial selected images
    setSelectedImages([/* initial selected images */]);
  }, []);

  const handleImageSelect = (image) => {
    // Toggle the selection of the image
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSubmit = () => {
    // Navigate to the next screen with the selected images
    navigation.navigate('NextScreen', { selectedImages });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={/* your image data */}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.imageContainer,
              selectedImages.includes(item) ? styles.selectedContainer : null,
            ]}
            onPress={() => handleImageSelect(item)}
          >
            {/* Render the image */}
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  imageContainer: {
    width: '33.33%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedContainer: {
    backgroundColor: 'lightgray',
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 50,
  },
});

export default SlideshowOrder;
