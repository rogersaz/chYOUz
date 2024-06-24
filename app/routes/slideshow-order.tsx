import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import 'tailwindcss/tailwind.css';

const supabaseUrl = 'https://xzlaojqvnvuvywshviso.supabase.co';
const supabaseKey = 'your-supabase-key'; // Replace with your actual Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SlideshowOrder() {
  const { register, handleSubmit } = useForm();
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onSubmit = async (data) => {
    console.log('Submitting data:', data);
    setIsUploading(true);
    try {
      const photoUrls = [];
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('photos')
          .upload(`public/${photo.name}`, photo);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const url = `${supabaseUrl}/storage/v1/object/public/photos/public/${photo.name}`;
        photoUrls.push(url);

        // Update progress
        setUploadProgress(((i + 1) / photos.length) * 100);
      }

      const { data: supabaseData, error } = await supabase
        .from('orders')
        .insert([{ 
          name: data.name, 
          email: data.email, 
          keywords: data.keywords, 
          genre: data.genre, 
          voice: data.voice,
          photos: photoUrls
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
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handlePhotoUpload = (event) => {
    setPhotos([...event.target.files]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Order Your Slideshow<br>Personalized songs for your moments and memories.</br></h2>
          <div className="w-36 h-36 bg-gray-200 flex items-center justify-center">
            <img src="https://github.com/rogersaz/chYOUz/blob/main/public/chYOUz-logoSM.png?raw=true" alt="chYOUz Logo" className="w-72 h-22" /> {/* Replace with your logo path */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 font-bold">Name</label>
            <input 
              type="text" 
              {...register("name", { required: true })} 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your name" 
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 font-bold">Email</label>
            <input 
              type="email" 
              {...register("email", { 
                required: true, 
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
              })} 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email" 
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-bold">Keywords for Song</label>
          <input 
            type="text" 
            {...register("keywords", { required: true })} 
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter keywords" 
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-bold">Song Genre</label>
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
          <label className="block mb-2 font-bold">Singer's Voice</label>
          <select 
            {...register("voice", { required: true, validate: value => value !== "select" })} 
            className="w-full px-3 py-2 border rounded-md"
            defaultValue="select"
          >
            <option value="select" disabled>Select Voice</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-bold">Upload Photos (max 25MB)</label>
          <input 
            type="file" 
            multiple 
            onChange={handlePhotoUpload} 
            className="w-full px-3 py-2 border rounded-md"
            accept="image/*"
          />
        </div>

        {isUploading && (
          <div className="mt-4">
            <label className="block mb-2 font-bold">Uploading Photos</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            disabled={isUploading}
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
