psql -f server/setup.sql
knex migrate:latest
knex seed:run