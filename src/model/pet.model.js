import db from "../database/connection.database.js";

const count = async () => {
  const query = {
    text: `SELECT COUNT(*) FROM pets`,
  };

  const { rows } = await db.query(query);

  return parseInt(rows[0].count);
};

const findAllPets = async ({ limit = 5, page = 1 }) => {
  const offset = (page - 1) * limit;

  const query = {
    text: `
        SELECT * FROM pets
        LIMIT $1
        OFFSET $2
    `,
    values: [limit, offset],
  };

  const { rows } = await db.query(query);

  return rows;
};

export const PetsModel = {
  findAllPets,
  count,
};
