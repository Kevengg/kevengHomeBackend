/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Request, RequestHandler, Response } from "express";
import type { ParamsDictionary, Query } from "express-serve-static-core";

const asyncRouteHandler = <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Query,
    Locals extends Record<string, any> = Record<string, any>,
>(
    asyncFn: (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
    ) => Promise<void>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
    return function (req, res, next) {
        asyncFn(req, res).catch(next);
    };
};

export default asyncRouteHandler;
