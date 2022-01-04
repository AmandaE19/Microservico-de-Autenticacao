import { NextFunction, Request, Response, Router } from "express";
import {StatusCodes} from "http-status-codes";

const usersRoute = Router();

//GET users
usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{userName: 'Amanda', password: '1234@'}];
    res.status(StatusCodes.OK).json({users});
});

//GET users/:id
usersRoute.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    
    res.status(StatusCodes.OK).send({id});
});

//POST users
usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(newUser);
});

//PUT users/:uuid
usersRoute.put('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK).send({id});
});

//DELETE users/:uuid
usersRoute.delete('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;