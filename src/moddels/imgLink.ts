export interface ImageLink {
    id: number;
    link: string;
    description: string;
}
export default interface ImageLinkConnection {
    // imageLinkId: number;
    imageLink: ImageLink;
    // woodType: undefined[];
    // product: undefined[];
}
