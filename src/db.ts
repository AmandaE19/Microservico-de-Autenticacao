import { Pool } from "pg";

const connectionString = 'postgres://hccmpigz:eyUgXiY__H9P1yf21dQDAjAR2-OfhpWT@kesavan.db.elephantsql.com/hccmpigz';

//O POOL IRÁ LIBERAR A CONEXÃO COM O BANCO
const db = new Pool({connectionString});

export default db;