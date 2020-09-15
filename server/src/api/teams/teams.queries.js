const db = require("../../db");

const tableNames = require("../../constants/tableNames");

const fields = ["id", "team_name"]

module.exports = {
    find() {
        // TODO: select only relavent columns --done
        // TODO: join to xxx table
        return db(tableNames.team).select(fields);
    },
    // TODO: get by name or id -- nested routes
    async get(id) {
        const [teams] = db(tableNames.team)
            .select(fields)
            .where({
                id,
            });
        return teams;
    },
};