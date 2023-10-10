import { ImageLink } from "@prisma/client";

export default interface Product {
    id: number;
    name: string;
    description: string;
    imageLinks: ImageLink;
    sold: boolean;
    activeFrom: Date;
}
