"use client";

import React, { useState } from "react";
import Success from "../../../public/success-check.png";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

interface FormikProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const ImageUpload = ({ setFieldValue }: FormikProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadImage = async () => {
    if (!image) {
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ""
    );
    data.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""
    );
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setFieldValue("image", res.url);
      setIsUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.currentTarget;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const file = fileInput.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result as string);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
    setIsUploaded(false);
  };

  return (
    <div className="mb-[10px]">
      <div>
        <div>
          <input
            hidden
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          {!preview && (
            <label
              htmlFor="hidden-input"
              className="flex cursor-pointer justify-center mb-[30px] py-5 border-b-2 border-gray-300"
            >
              <div className="flex justify-center items-center py-3 px-6 outline-none hover:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] hover:scale-[102%] focus:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out focus:scale-[102%] bg-lime-300 rounded-md">
                Вибрати файл
              </div>
            </label>
          )}
          {preview && (
            <div className="flex">
              <div className="relative w-[150px] mr-[50px]">
                <CldImage
                  src={preview}
                  alt="preview"
                  width={150}
                  height={150}
                  crop="fill"
                  gravity="auto"
                  className=""
                />
                {isUploaded && (
                  <Image
                    src={Success}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute top-0 right-[-30px]"
                  />
                )}
              </div>
              <div className="self-end">
                <button
                  type="button"
                  onClick={uploadImage}
                  disabled={isUploaded}
                  className="flex justify-center items-center w-[140px] mb-[20px] px-4 py-3 outline-none transition ease-in-out hover:scale-[110%] bg-lime-300 rounded-lg"
                >
                  Завантажити
                </button>
                <button
                  type="button"
                  onClick={handleResetClick}
                  className="flex justify-center items-center w-[140px] px-4 py-3 outline-none transition ease-in-out hover:scale-[110%] bg-lime-300 rounded-lg"
                >
                  Скинути
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
