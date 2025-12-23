"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageCropModal from "./ImageCropModal";

export default function AvatarStep() {
    const router = useRouter();
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
        <div className="space-y-8 text-center">
            <h1 className="text-3xl font-semibold">
                Add a profile photo
            </h1>

            <p className="text-zinc-300">
                Optional, but recommended.
            </p>

            <div className="flex justify-center">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-zinc-800">
                    {image && (
                        <img
                            src={image}
                            alt="avatar"
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>

            {/* CHOOSE PHOTO BUTTON */}
            <label
                htmlFor="avatar-upload"
                className="mx-auto flex h-12 w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-full bg-red-600 text-lg font-semibold text-white hover:bg-red-700 active:bg-red-800 transition"
            >
                <Camera className="h-5 w-5" />
                Choose profile picture
            </label>

            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
            />

            {/* CONTINUE / SKIP */}
            {image ? (
                <button
                    onClick={() => router.push("/profile")}
                    className="mx-auto h-16 w-full max-w-sm rounded-full bg-red-600 text-2xl font-bold text-white
             ring-4 ring-yellow-400
             hover:bg-red-700 active:bg-red-800 transition"
                >
                    Continue To Your Profile!
                </button>

            ) : (
                <button
                    onClick={() => router.push("/profile")}
                    className="mx-auto h-12 w-full max-w-sm rounded-full border border-border text-muted-foreground"
                >
                    Skip for now
                </button>
            )}

            {/* CROP MODAL */}
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
