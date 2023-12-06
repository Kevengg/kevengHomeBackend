import ImageLinkConnection from "./imgLink";

export default interface stain {
    id: number;
    name: string;
    description: string;
    priceSquareMeter: number;
    images: ImageLinkConnection[];
}
