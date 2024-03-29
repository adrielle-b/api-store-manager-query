const connection = require('./connection');

const findAll = async () => {
    const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
    return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const { name } = product;
  const query = 'INSERT INTO products (name) VALUES (?);';

  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (product, id) => {
  const { name } = product;
  const query = 'UPDATE products SET name = ? WHERE id = ?;';
  return connection.execute(query, [name, id]);
};

const exclui = async (id) => {
const query = 'DELETE FROM products WHERE id = ?;';
return connection.execute(query, [id]);
};

module.exports = {
    findAll,
    findById,
    insert,
    update,
    exclui,
};
