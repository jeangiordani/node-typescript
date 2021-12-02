import { createConnection } from 'typeorm';

createConnection()
	.then(()=> console.log("Banco de dados rodando"))
	.catch(() => console.log("Erro no banco"));