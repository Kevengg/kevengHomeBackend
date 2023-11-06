import { ImageLink } from "@prisma/client";

export default interface Product {
    id: number;
    name: string;
    description: string;
    price: number | null;
    listPrice: number | null;
    soldPrice: number | null;
    sold: boolean;
    soldAt: Date | null;
    activeFrom: Date | null;
    created: Date;
    priceBreakdown: string | null;
    ImageLinks: ImageLink[];
}
