import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, Options } from '@mikro-orm/postgresql';

const config: Options = {
  entities: ['./dist/entities'], // Path to your compiled JS entities
  entitiesTs: ['./src/entities'], // Path to your TypeScript entities
  dbName: 'testdb',
  user: 'hello',
  password: 'local',
  host: 'localhost',
  port: 5432,
  // host: 'localhost',
  // port: 5044,
  debug: true, // enable this for debugging queries during development
  migrations: {
    path: './dist/migrations', // Path to compiled migrations
    pathTs: './src/migrations', // Path to TypeScript migration files
    tableName: 'mikro_orm_migrations', // Custom table name for migrations
  },
  extensions: [Migrator, EntityGenerator],
};

export default defineConfig(config);

export const testConfig: Options = defineConfig({
  ...config,
  allowGlobalContext: true,
  dbName: ':memory:',
});
