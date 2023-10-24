import { ImageLink } from "@prisma/client";

export default interface Product {
    id: number;
    name: string;
    description: string;
    sold: boolean;
    activeFrom: Date;
    imageLinks: ImageLink[];
}
