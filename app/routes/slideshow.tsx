// slideshow.tsx
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xzlaojqvnvuvywshviso.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bGFvanF2bnZ1dnl3c2h2aXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MjI1MzAsImV4cCI6MjAzNDQ5ODUzMH0.qsk6kRv8uKts0K6-3da02Kpmsee50KAhlHiWAGsms5U"
);

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const songKeywords = formData.get("songKeywords");
  const musicGenre = formData.get("musicGenre");
  const voiceType = formData.get("voiceType");
  const singer = formData.get("singer");
  const photos = formData.getAll("photos") as File[];

  // Upload photos to Supabase
  try {
    const uploadPromises = photos.map(async (photo) => {
      const { data, error } = await supabase.storage
        .from("slideshow-photos")
        .upload(`${name}-${photo.name}`, photo);

      if (error) {
        throw error;
      }
      return data;
    });

    await Promise.all(uploadPromises);

    // Save form data to Supabase
    const { error: dbError } = await supabase.from("slideshow_data").insert([
      {
        name,
        email,
        songKeywords,
        musicGenre,
        voiceType,
        singer,
      },
    ]);

    if (dbError) {
      return { error: "Error saving data to Supabase" };
    }

    return { success: true };
  } catch (error) {
    return { error: "Error uploading photos or saving data" };
  }
};

export default function Slideshow() {
  const actionData = useActionData();
  const transition = useTransition();
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files).slice(0, 25));
    }
  };

  return (
    <div>
      <h1>Slideshow</h1>
      <Form method="post" encType="multipart/form-data">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="songKeywords">Short Song Keywords or Phrase:</label>
          <input type="text" id="songKeywords" name="songKeywords" required />
        </div>
        <div>
          <label htmlFor="musicGenre">Music Genre:</label>
          <select id="musicGenre" name="musicGenre" required>
            <option value="">Select a genre</option>
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
          </select>
        </div>
        <div>
          <label htmlFor="voiceType">Voice Type:</label>
          <input type="text" id="voiceType" name="voiceType" required />
        </div>
        <div>
          <label htmlFor="singer">Singer:</label>
          <input type="text" id="singer" name="singer" required />
        </div>
        <div>
          <label htmlFor="photos">Upload Photos:</label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>
        <button type="submit" disabled={transition.state === "submitting"}>
          {transition.state === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      {actionData?.success && <p style={{ color: "green" }}>Success!</p>}
    </div>
  );
}

