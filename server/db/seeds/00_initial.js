const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Knex = require("knex");

const tableNames = require("../../src/constants/tableNames");
const orderedTableNames = require("../../src/constants/orderedTableNames");
const roles = require("../../src/constants/roles");
const teams = require("../../src/constants/teams");

// const {
//   addDefaultColumns,
//   createNameTable,
//   references,
// } = require("../../src/lib/tableUtils");

/**
 *
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await orderedTableNames.reduce(async (promise, table_name) => {
    await promise;
    console.log("Clearing", table_name);
    return knex(table_name).del();
  }, Promise.resolve());

  const password = crypto.randomBytes(15).toString("hex");

  const user = {
    username: "wspridgen0",
    password: await bcrypt.hash(password, 12),
    email: "wspridgen0@163.com",
    first_name: "Willyt",
    last_name: "Spridgen",
    is_project_manager: true,
  };

  const [createdUser] = await knex(tableNames.user)
  .insert(user)
    .returning("*");
  
  if (process.env.NODE_ENV !== "test") {
    console.log("User created:", {
      password,
    }, createdUser);
  }
  

  await knex(tableNames.team)
  .insert(teams);

  await knex(tableNames.role)
  .insert(roles);

  // await knex ('table_name').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
};
