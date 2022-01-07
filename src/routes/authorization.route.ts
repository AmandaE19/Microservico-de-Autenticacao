import {Router, Response, Request, NextFunction} from "express";
import JWT, { SignOptions } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbidden.error.model";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";


const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user;
        if(!user){
            throw new ForbiddenError('Usuário não informado!');
        }

        const jwtPayload = {username: user.username};
        const jwtOptions: SignOptions = {subject: user?.uuid, expiresIn: 60000};
        const secretKey = 'my_secret_key';
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({token: jwt});
    }catch(error){
        next(error);
    }
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

//REFRESH TOKEN
authorizationRoute.post('/token/refresh', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user;
        if(!user){
            throw new ForbiddenError('Usuário não informado!');
        }

        const jwtPayload = {username: user.username};
        const jwtOptions: SignOptions = {subject: user?.uuid, expiresIn: '15m'};
        const secretKey = 'my_secret_key';
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({token: jwt});
    }catch(error){
        next(error);
    }
});

export default authorizationRoute;