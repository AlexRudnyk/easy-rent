import { getAllAdverts } from "../../actions";
import { IAdvert } from "../../types/IAdvert";
import { AdvertsPageClient } from "./components";

export default async function Home() {
  const adverts: IAdvert[] | undefined = await getAllAdverts();

  const plainAdverts = adverts?.map((advert: IAdvert) => ({
    _id: advert._id?.toString(),
    image: advert.image,
    title: advert.title,
    description: advert.description,
    price: advert.price,
    location: advert.location,
  }));

  return (
    <main className="">
      <AdvertsPageClient adverts={plainAdverts} />
    </main>
  );
}
