import express from "express";
import errorHandler from "./middlewares/error-handler-middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//CONFIGURAÇÃO DA APLICAÇÃO
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONFIGURAÇÃO DE ROTAS
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

//CONFIGURAÇÃO DOS HANDLERS DE ERRO
app.use(errorHandler);

//INICIALIZAÇÃO DO SERVIDOR
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000');
});