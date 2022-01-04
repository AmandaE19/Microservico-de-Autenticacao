import express from "express";

const initRoute = express();

initRoute.listen(3000, () => {
    console.log('Aplicação executando na porta 3000');
});

export default initRoute;
