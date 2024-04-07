"use server";

import { revalidatePath } from "next/cache";
import connect from "./db";
import Advert from "./src/app/model/Advert";
import { IFormValues } from "./types/IFormValues";

export async function getAllAdverts() {
  try {
    await connect();

    const adverts = await Advert.find();

    return adverts;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}

export async function addAdvert({
  image,
  title,
  description,
  price,
  location,
}: IFormValues) {
  try {
    await connect();

    await Advert.create({ image, title, description, price, location });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}

export async function deleteAdvert(id: string) {
  try {
    await connect();

    await Advert.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}
