export interface IAdvert {
  _id?: number;
  position: { lat: number; lng: number; _id: number };
  title: string;
  price: number;
  image: string;
  description: string;
}
