"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IFormValues } from "../../../types/IFormValues";
import { formValidationSchema } from "@/helpers/formValidationSchema";
import { Autocomplete } from ".";

interface AdvertFormProps {
  isLoaded: boolean;
  onSelect: (coordinates: { lat: number; lng: number }) => void;
}

const AddAdvertForm = ({ isLoaded, onSelect }: AdvertFormProps) => {
  const [image, setImage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const initialValues: IFormValues = {
    image: "",
    title: "",
    description: "",
    price: 0,
    location: "",
  };

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (!e.currentTarget.files?.length) return;

    const file = e.currentTarget.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    setFieldValue("image", file);

    if (e.target) {
      e.target.value = "";
    }
  };

  const handleOnSubmit = (
    values: IFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("VALUES", values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              ref={inputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e, setFieldValue)
              }
              className=""
            />
            <ErrorMessage name="image" />
          </div>

          <div className="">
            <label className="" htmlFor="title">
              Заголовок
            </label>
            <Field className="" type="text" id="title" name="title" />
            <ErrorMessage className="" name="title" component="div" />
          </div>

          <div className="">
            <label className="" htmlFor="description">
              Опис
            </label>
            <Field
              className=""
              as="textarea"
              id="description"
              name="description"
            />
            <ErrorMessage className="" name="description" component="div" />
          </div>

          <div className="">
            <label className="" htmlFor="price">
              Ціна
            </label>
            <Field className="" type="number" id="price" name="price" />
            <ErrorMessage className="" name="price" component="div" />
          </div>

          <div className="">
            <label className="">
              Адреса <span className="">(місто, вулиця, номер будинку)</span>
            </label>
            <Autocomplete
              setFieldValue={setFieldValue}
              isLoaded={isLoaded}
              onSelect={onSelect}
            />
            <ErrorMessage className="" name="location" component="div" />
          </div>

          <button className="" type="submit">
            Подати оголошення
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddAdvertForm;
