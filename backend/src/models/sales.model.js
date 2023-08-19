const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
    const [sales] = await connection.execute(`SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM sales as s 
    INNER JOIN sales_products as sp 
    ON s.id = sp.sale_id
    ORDER BY sale_id, product_id;`);
    return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM sales as s 
    INNER JOIN sales_products as sp 
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ? 
    ORDER BY sale_id, product_id;`,
    [saleId],
  );
  return camelize(sale);
};

const insert = async (sales) => {
  const querySales = 'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)';
  const [{ insertId }] = await connection.execute(querySales);

  const querySalesPr = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?);';
  const promises = sales 
  .map(({ productId, quantity }) => connection
  .execute(querySalesPr, [insertId, productId, quantity]));
  await Promise.all(promises);

  return insertId;
};

module.exports = {
    findAll,
    findById,
    insert,
};