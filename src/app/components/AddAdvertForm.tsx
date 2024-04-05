"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IFormValues } from "../../../types/IFormValues";
import { formValidationSchema } from "@/helpers/formValidationSchema";
import { Autocomplete, ImageUpload } from ".";
import { addAdvert } from "../../../actions";

interface AdvertFormProps {
  isLoaded: boolean;
  onSelect: (coordinates: { lat: number; lng: number }) => void;
  onClose: () => void;
}

const AddAdvertForm = ({ isLoaded, onSelect, onClose }: AdvertFormProps) => {
  const initialValues: IFormValues = {
    image: "",
    title: "",
    description: "",
    price: 0,
    location: "",
  };

  const handleOnSubmit = (
    values: IFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    addAdvert(values);
    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="w-full flex flex-col">
          <ImageUpload setFieldValue={setFieldValue} />

          <div className="mb-[8px]">
            <label className="block mb-[5px]" htmlFor="title">
              Заголовок
            </label>
            <Field
              className="border border-gray-300 w-full p-2 rounded-md"
              type="text"
              id="title"
              name="title"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="title" />
            </div>
          </div>

          <div className="mb-[8px]">
            <label className="block mb-[5px]" htmlFor="description">
              Опис
            </label>
            <Field
              className="border border-gray-300 w-full p-2 rounded-md resize-none"
              as="textarea"
              id="description"
              name="description"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="description" />
            </div>
          </div>

          <div className="mb-[8px]">
            <label className="block mb-[5px]" htmlFor="price">
              Ціна
            </label>
            <Field
              className="border border-gray-300 w-full p-2 rounded-md"
              style={{
                "::WebkitInnerSpinButton": { display: "none" },
                "::WebkitOuterSpinButton": { display: "none" },
                MozAppearance: "textfield",
              }}
              type="number"
              id="price"
              name="price"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="price" />
            </div>
          </div>

          <div className="mb-[8px]">
            <label className="block mb-[5px]">
              Адреса <span className="">(місто, вулиця, номер будинку)</span>
            </label>
            <Autocomplete
              setFieldValue={setFieldValue}
              isLoaded={isLoaded}
              onSelect={onSelect}
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="location" />
            </div>
          </div>
          <button
            className="flex justify-center items-center py-3 px-6 outline-none transition ease-in-out hover:scale-[105%] bg-lime-300 rounded-lg"
            type="submit"
          >
            Подати оголошення
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddAdvertForm;
