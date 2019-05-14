import { Application, Request, Response } from 'express';

export class Index {

    public routes(app: Application): void {
        app.get('/index', (req: Request, res: Response) => {
            res.status(200).send({ status: 'success' });
        });
    }
}