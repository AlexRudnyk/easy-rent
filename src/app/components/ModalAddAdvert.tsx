"use client";

import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalAddAdvertProps {
  onClose: () => void;
}

const ModalAddAdvert = ({ onClose }: ModalAddAdvertProps) => {
  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", onEscClick);

    return () => {
      window.removeEventListener("keydown", onEscClick);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) onClose();
  };
  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-5"
    >
      <div className="relative w-[500px] bg-white p-12 flex justify-center items-center rounded-2xl">
        <button
          type="button"
          className="absolute top-[10px] right-[10px] p-4 rounded-full z-10"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        {/* <Formik
          initialValues={initialValues}
          validationSchema={ModalEditGoodSchema()}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="w-[300px] flex flex-col mo:w-full sm:w-full">
              <div className="relative">
                <Field
                  type="text"
                  name="title"
                  placeholder={t("title")}
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="title" />
                </div>
              </div>
              <div className="relative">
                <Field
                  type="text"
                  name="text"
                  placeholder={t("text")}
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="text" />
                </div>
              </div>
              <div className="relative">
                <Field
                  as="textarea"
                  value={description}
                  type="text"
                  name="description"
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full resize-none"
                  placeholder={t("description")}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFieldValue("description", e.currentTarget.value);
                    setDescription(e.currentTarget.value);
                  }}
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="relative">
                <Field
                  type="number"
                  name="price"
                  placeholder={t("price")}
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="price" />
                </div>
              </div>

              <SubmitButton />
            </Form>
          )}
        </Formik> */}
      </div>
    </div>
  );
};

export default ModalAddAdvert;
