// function addDefaultColumns(table) {
//     table.timestamps(false, true);
//     table.datetime("deleted_at");
//   }
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

//   module.exports ={
//       addDefaultColumns,
//       createNameTable,
//       references,
//   };