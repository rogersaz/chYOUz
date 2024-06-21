import { useState } from "react";
import { useActionData, Form, json, redirect } from "remix";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xzlaojqvnvuvywshviso.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MjI1MzAsImV4cCI6MjAzNDQ5ODUzMH0.qsk6kRv8uKts0K6-3da02Kpmsee50KAhlHiWAGsms5U"; // replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const songKeywords = formData.get("songKeywords");
  const musicGenre = formData.get("musicGenre");
  const voiceType = formData.get("voiceType");
  const singer = formData.get("singer");
  const photos = formData.getAll("photos");

  const { data, error } = await supabase.from("slideshows").insert([
    {
      name,
      email,
      song_keywords: songKeywords,
      music_genre: musicGenre,
      voice_type: voiceType,
      singer,
    },
  ]);

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  // Handle file uploads
  for (let photo of photos) {
    const { data, error } = await supabase.storage
      .from("photos")
      .upload(`public/${photo.name}`, photo);

    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
  }

  return redirect("/success");
};

export default function Slideshow() {
  const actionData = useActionData();
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e) => {
    setFileCount(e.target.files.length);
  };

  return (
    <div>
      <h1>Create a Slideshow</h1>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      <Form method="post" encType="multipart/form-data">
        <div>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Email Address:
            <input type="email" name="email" required />
          </label>
        </div>
        <div>
          <label>
            Short Song Keywords or Phrase:
            <input type="text" name="songKeywords" required />
          </label>
        </div>
        <div>
          <label>
            Music Genre:
            <select name="musicGenre" required>
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
        </div>
        <div>
          <label>
            Voice Type:
            <select name="voiceType" required>
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
        </div>
        <div>
          <label>
            Singer:
            <select name="singer" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Upload Photos (25 max):
            <input type="file" name="photos" multiple onChange={handleFileChange} accept="image/*" required />
          </label>
          <p>{fileCount} files selected</p>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
