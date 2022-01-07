import { NextFunction, Request, Response, Router } from "express";
import {StatusCodes} from "http-status-codes";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import DataBaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

//GET users
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).json({users});
});

//GET users/:id
usersRoute.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user =  await userRepository.findByUuid(uuid);
        res.status(StatusCodes.OK).send(user);
    }catch(error){
        next(error);
    }
});

//POST users
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.createUser(newUser);

    res.status(StatusCodes.CREATED).send(uuid);
});

//PUT users/:uuid
usersRoute.put('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const modifyUser = req.body;
    modifyUser.uuid = uuid;
    
    await userRepository.updateUser(modifyUser); 
    
    res.status(StatusCodes.OK).send({uuid});
});

//DELETE users/:uuid
usersRoute.delete('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.removeUser(uuid);
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;