import { createConnection, getConnection } from 'typeorm';

const testing = true;

export const conn = createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '9177',
  database: testing ? 'teste_user_test' : 'teste_user',
  entities: ['src/models/*.ts'],
})
  .then(() => console.log('Banco de dados rodando'))
  .catch(() => console.log('Erro no banco'));

// createConnection('default')
//   .then(() => console.log('Banco de dados rodando'))
//   .catch(() => console.log('Erro no banco'));
