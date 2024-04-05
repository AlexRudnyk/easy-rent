import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  image: Yup.mixed()
    .required("Фото обовʼязкове")
    .test("is-file", "Фотографія обовʼязкова", (value) => {
      return !!value;
    }),
  title: Yup.string()
    .required("Обовʼязкове поле")
    .min(3, "Заголовок має складатися не менше ніж з 3 символів")
    .max(30, "Заголовок не може перевищувати 30 символів"),
  description: Yup.string()
    .required("Обовʼязкове поле")
    .min(3, "Опис має складатися не менше ніж з 3 символів")
    .max(100, "Опис не може перевищувати 100 символів"),
  price: Yup.number()
    .required("Ціна обовʼязкова")
    .min(1, "Ціна не може бути нулем або відʼємним значенням"),
  location: Yup.string()
    .required("Адреса обовʼязкова")
    .min(3, "Адреса має складатися не менше ніж з 3 символів"),
});
