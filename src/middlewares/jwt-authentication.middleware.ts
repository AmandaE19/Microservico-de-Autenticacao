//AUTENTICAÇÃO BASEADA EM UM TOKEN

import { NextFunction, Response, Request } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from "jsonwebtoken";
import userRepository from "../repositories/user.repository";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try{
        const authorizationHeader = req.headers['authorization'];
        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }
        const [authenticationType, token] = authorizationHeader.split(' ');
        
        //VERIFICA SE TEM UM TOKEN OU SE É UM BEARER
        if(authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        try{
            
            //VERIFICA SE O TOKEN É VÁLIDO
            const tokenPayload = JWT.verify(token, 'my_secret_key');

            if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbiddenError('Token Inválido');   
            }

            const user = {uuid: tokenPayload.sub, username: tokenPayload.username};    
            req.user = user;
            next();
        }
        catch(error){
            throw new ForbiddenError('Token Inválido');
        }
    }catch(error){
        next(error);
    }
}

export default jwtAuthenticationMiddleware;