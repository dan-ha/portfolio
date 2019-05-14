import { Request, Response, NextFunction } from 'express';

export function logging(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    next(err);
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).send({ error: err.message })
}