"use client";

import { useState } from "react";
import ImageCropModal from "./ImageCropModal";

export default function AvatarStep() {
  const [image, setImage] = useState<string | null>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setRawImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add a profile photo</h1>
      <p className="text-sm text-zinc-500">
        Optional, but recommended.
      </p>

      <div className="flex justify-center">
        <div className="h-32 w-32 overflow-hidden rounded-full bg-zinc-200">
          {image && (
            <img src={image} alt="avatar" className="h-full w-full object-cover" />
          )}
        </div>
      </div>

      <input type="file" accept="image/*" onChange={onFileChange} />

      <button className="w-full rounded-full border p-3">
        Skip for now
      </button>

      {rawImage && (
        <ImageCropModal
          imageSrc={rawImage}
          onCancel={() => setRawImage(null)}
          onSave={(img) => {
            setImage(img);
            setRawImage(null);
          }}
        />
      )}
    </div>
  );
}
