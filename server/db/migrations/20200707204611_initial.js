const Knex = require("knex");

const tableNames = require("../../src/constants/tableNames");

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}
// function to create simple tables that are only an ID and name
// function createNameTable (knex, table_name) {
//     await knex.schema.createTable(table_name, (table) => {
//         table.increments().notNullable();
//         table.string('name' 128).notNullable().unique();
//         addDefaultColumns(table);
//     });
// }

// function references(table, tableName) {
//     table
// .integer("${tableName}_id")
// .unsigned().references("id")
// .inTable(TableName);
// .onDelete("cascade");
// }

/**
 *
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string("username", 64).notNullable().unique();
    table.string("password", 64).notNullable();
    table.string("email", 254).notNullable().unique();
    table.string("first_name", 64).notNullable();
    table.string("last_name", 64).notNullable();
    table.boolean("is_project_manager");
    table.datetime("last_login");
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.team, (table) => {
    table.increments().notNullable();
    table.string("team_name", 128).notNullable().unique();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.role, (table) => {
    table.increments().notNullable();
    table.string("role_name", 128).notNullable().unique();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.client_partner, (table) => {
    table.increments().notNullable();
    table.string("cp_name", 254);
    table.string("cp_street_address_1", 50).notNullable();
    table.string("cp_street_address_2", 50);
    table.string("cp_city", 50).notNullable();
    table.string("cp_province", 50).notNullable();
    table.string("cp_postal_code", 7).notNullable();
    table.text("cp_details");
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.project, (table) => {
    table.increments().notNullable();
    table.string("project_name", 64).notNullable();
    table.date("planned_start_date");
    table.date("planned_end_date");
    table.date("actual_start_date");
    table.date("actual_end_date");
    table.text("project_description");
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.project_manager, (table) => {
    table.increments().notNullable();
    table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("project")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("cascade")
      .notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.employee, (table) => {
    table.increments().notNullable();
    table.string("employee_code").notNullable().unique();
    table.string("employee_name").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("cascade")
      .notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.team_member, (table) => {
    table.increments().notNullable();
    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("team")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("employee_id")
      .unsigned()
      .references("id")
      .inTable("employee")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("role")
      .onDelete("cascade")
      .notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.on_project, (table) => {
    table.increments().notNullable();
    table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("project")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("client_partner_id")
      .unsigned()
      .references("id")
      .inTable("client_partner")
      .onDelete("cascade")
      .notNullable();
    table.date("date_start").notNullable();
    table.date("date_end");
    table.boolean("is_partner").notNullable();
    table.text("description");
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.task, (table) => {
    table.increments().notNullable();
    table.string("task_name", 254).notNullable();
    table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("project")
      .onDelete("cascade")
      .notNullable();
    table.integer("priority").notNullable();
    table.text("description");
    table.date("planned_start_date").notNullable();
    table.date("planned_end_date").notNullable();
    table.decimal("planned_budget", 8, 2).notNullable();
    table.date("actual_start_time");
    table.date("actual_end_time");
    table.decimal("actual_budget", 8, 2);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.preceding_task, (table) => {
    table.increments().notNullable();
    table
      .integer("task_id")
      .unsigned()
      .references("id")
      .inTable("task")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("preceding_task_id")
      .unsigned()
      .references("id")
      .inTable("preceding_task")
      .onDelete("cascade")
      .notNullable();
  });

  await knex.schema.createTable(tableNames.activity, (table) => {
    table.increments().notNullable();
    table.string("activity_name", 254).notNullable();
    table.integer("task_id").unsigned().references("id").inTable("task");
    table.integer("priority");
    table.text("description");
    table.date("planned_start_date").notNullable();
    table.date("planned_end_date").notNullable();
    table.decimal("planned_budget", 8, 2).notNullable();
    table.date("actual_start_time");
    table.date("actual_end_time");
    table.decimal("actual_budget", 8, 2);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.preceding_activity, (table) => {
    table.increments().notNullable();
    table
      .integer("activity_id")
      .unsigned()
      .references("id")
      .inTable("activity")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("preceding_activity_id")
      .unsigned()
      .references("id")
      .inTable("preceding_activity")
      .onDelete("cascade")
      .notNullable();
  });

  await knex.schema.createTable(tableNames.assigned, (table) => {
    table.increments().notNullable();
    table
      .integer("activity_id")
      .unsigned()
      .references("id")
      .inTable("activity")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("employee_id")
      .unsigned()
      .references("id")
      .inTable("employee")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("role")
      .onDelete("cascade")
      .notNullable();
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  //array that drops all tables without writing the following:
  // await knex.schema.dropTable(tableNames.user);
  await Promise.all(
    [
      tableNames.assigned,
      tableNames.preceding_activity,
      tableNames.activity,
      tableNames.preceding_task,
      tableNames.task,
      tableNames.on_project,
      tableNames.team_member,
      tableNames.employee,
      tableNames.project_manager,
      tableNames.project,
      tableNames.user,
      tableNames.team,
      tableNames.role,
      tableNames.client_partner,
    ].map((tableName) => knex.schema.dropTable(tableName))
  );
};
