import express from "express";
import initRoute from "./routes/init.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//CONFIGURAÇÃO DA APLICAÇÃO
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CONFIGURAÇÃO DE ROTAS
app.use(statusRoute);
app.use(usersRoute);

//INICIALIZAÇÃO DO SERVIDOR
app.use(initRoute);