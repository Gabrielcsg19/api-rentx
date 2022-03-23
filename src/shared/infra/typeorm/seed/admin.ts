import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO USERS
      (id, name, email, password, is_admin, created_at, driver_license)
    VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
  `);

  await connection.close();
}

// eslint-disable-next-line no-console
create().then(() => console.log('User admin created!'));
