import { getAllAdverts } from "../../actions";
import { IAdvert } from "../../types/IAdvert";
import { AdvertsPageClient } from "./components";

export default async function Home() {
  const adverts: IAdvert[] | undefined = await getAllAdverts();

  return (
    <main className="">
      <AdvertsPageClient adverts={adverts} />
    </main>
  );
}
