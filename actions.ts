"use server";

import { revalidatePath } from "next/cache";
import connect from "./db";
import Advert from "./src/app/model/Advert";
import { IAdvert } from "./types/IAdvert";

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
  position,
  price,
}: IAdvert) {
  try {
    await connect();

    await Advert.create({
      image,
      title,
      position,
      price,
      description,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}
