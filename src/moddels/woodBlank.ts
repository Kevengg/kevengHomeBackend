import ImageLinkConnection from "./imgLink";

export default interface woodBlank {
    id: number;
    sizeX: number;
    sizeY: number;
    sizeZ: number;
    priceMultiplier: number;
    WoodTypeId: number;
    images: ImageLinkConnection[];
}
