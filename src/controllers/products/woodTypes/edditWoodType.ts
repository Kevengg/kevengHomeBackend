import { Body, Controller, Put, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from "express";
import ErrorReturn from "../../../moddels/errorReturn";
import handleError from "../../../utilities/handleError";
import { db } from "../../../db";

interface EditWoodTypesBody {
    id: number;
    name?: string;
    description?: string;
    basePrise?: number;
    widthMultiplier?: number;
    lengthMultiplier?: number;
}

interface EditWoodTypesImagesBody {
    id: number;
    images: number[];
    remove?: boolean;
}

@Route("/edit")
@Tags("edit wood types")
export class EditWoodTypes extends Controller {
    @Put("/woodtypes")
    public async editWoodTypes(
        @Body() body: EditWoodTypesBody,
        @Request() request: ExpressRequest,
    ): Promise<unknown | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "EditWoodTypes", request);

        // error out if no id was provided
        if (!body.id) {
            return err({
                error: 401,
                errorMsg:
                    "Please provide the id of the wood type you want to edit",
            });
        }

        // get the selected wood type
        const woodType = await db.woodType.findFirst({
            where: { id: { equals: body.id } },
        });

        // error out if no wood type was found
        if (!woodType) {
            return err({
                error: 404,
                errorMsg: "No wood type with the provided id was found",
            });
        }

        const editedWoodType = await db.woodType.update({
            where: { id: body.id },
            data: { ...Body },
        });

        // if operation was a sucess return
        if (editedWoodType.id) {
            return {
                before: woodType,
                after: editedWoodType,
            };
        }

        // else error out
        return err({
            error: 400,
            errorMsg: "Something went wrong",
        });
    }

    @Put("/woodtypes/images")
    public async editWoodTypeImages(
        @Body() body: EditWoodTypesImagesBody,
        @Request() request: ExpressRequest,
    ): Promise<unknown | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "EditProduct", request);

        // error out if no id was provided
        if (!body.id) {
            return err({
                error: 401,
                errorMsg:
                    "Please provide the id of the wood type you want to edit",
            });
        }

        // error out if no image ids was provided
        if (!body.id) {
            return err({
                error: 401,
                errorMsg:
                    "Please provide at least one id of an image you want to edit ",
            });
        }

        // find if wood type exists
        const woodType = await db.woodType.findFirst({
            where: { id: { equals: body.id } },
        });

        if (!woodType) {
            err({
                error: 404,
                errorMsg: "No wood type with the provided id was found",
            });
        }

        // create the array for connect
        const connectArr = body.images?.reduce(
            (prev, current) => {
                return [...prev, { imageLinkId: current }];
            },
            [] as { imageLinkId: number }[],
        );

        const dbReturn = await db.woodType.update({
            where: { id: body.id },
            data: { images: { connect: connectArr } },
        });

        // if operation was a sucess return
        if (dbReturn.id) {
            return {
                before: woodType,
                after: dbReturn,
            };
        }

        // else error out
        return err({
            error: 400,
            errorMsg: "Something went wrong",
        });
    }
}
