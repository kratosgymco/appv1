"use client";

import Cropper from "react-easy-crop";
import { useState } from "react";

type Props = {
  imageSrc: string;
  onCancel: () => void;
  onSave: (croppedImage: string) => void;
};

export default function ImageCropModal({ imageSrc, onCancel, onSave }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  async function getCroppedImage() {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((res) => (image.onload = res));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const size = Math.min(image.width, image.height);
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(
      image,
      (image.width - size) / 2,
      (image.height - size) / 2,
      size,
      size,
      0,
      0,
      size,
      size
    );

    onSave(canvas.toDataURL("image/jpeg"));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[90vw] max-w-sm rounded-xl bg-white p-4">
        <div className="relative h-64 w-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="mt-4 w-full"
        />

        <div className="mt-4 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border p-2"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImage}
            className="flex-1 rounded-lg bg-black p-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
