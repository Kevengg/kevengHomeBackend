import ImageLinkConnection from "./imgLink";
import stain from "./stain";
import woodBlank from "./woodBlank";

export default interface woodType {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    widthMultiplier: number;
    lengthMultiplier: number;
    images: ImageLinkConnection[];
    woodBlanks?: woodBlank[];
    stains?: stain[];
}
