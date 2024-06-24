// slideshow-order.tsx
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import 'tailwindcss/tailwind.css';

const supabaseUrl = 'https://xzlaojqvnvuvywshviso.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODkyMjUzMCwiZXhwIjoyMDM0NDk4NTMwfQ.4a728R5ZXAx3S25lBN80WzKn476NQCOrHXnDKz_xeFM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SlideshowOrder() {
  const { register, handleSubmit } = useForm();
  const [photos, setPhotos] = useState<File[]>([]);

  const onSubmit = async (data) => {
    console.log('Submitting data:', data);
    try {
      const { data: supabaseData, error } = await supabase
        .from('orders')
        .insert([{ 
          name: data.name, 
          email: data.email, 
          keywords: data.keywords, 
          genre: data.genre, 
          voice: data.voice,
          photos: photos.map(photo => photo.name) // Assuming you'll handle file uploads separately
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Supabase response:', supabaseData);
      alert('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order');
    }
  };

  const handlePhotoUpload = (event) => {
    setPhotos([...event.target.files]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl mb-6 font-semibold text-center">Order Your Slideshow</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2">Name</label>
            <input 
              type="text" 
              {...register("name", { required: true })} 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your name" 
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2">Email</label>
            <input 
              type="email" 
              {...register("email", { required: true })} 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email" 
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Keywords for Song</label>
          <input 
            type="text" 
            {...register("keywords", { required: true })} 
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter keywords" 
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Song Genre</label>
          <select 
            multiple 
            {...register("genre", { required: true })} 
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Bluegrass">Bluegrass</option>
            <option value="Country">Country</option>
            <option value="Folk">Folk</option>
            <option value="Popular Pop">Popular Pop</option>
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
            <option value="Punk Rock">Punk Rock</option>
            <option value="Skate Rock">Skate Rock</option>
            <option value="Skatecore">Skatecore</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Singer Voice</label>
          <select 
            {...register("voice", { required: true })} 
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Upload Photos (max 25MB)</label>
          <input 
            type="file" 
            multiple 
            onChange={handlePhotoUpload} 
            className="w-full px-3 py-2 border rounded-md"
            accept="image/*"
          />
        </div>

        <div className="mt-6 text-center">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
