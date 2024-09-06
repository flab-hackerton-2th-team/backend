import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

const config: MikroOrmModuleOptions = {
  entities: ['./dist/entities'], // Path to your compiled JS entities
  entitiesTs: ['./src/entities'], // Path to your TypeScript entities
  dbName: 'testdb',
  user: 'hello',
  password: 'local',
  host: 'postgres',
  port: 5432,
  debug: true, // enable this for debugging queries during development
  migrations: {
    path: './dist/migrations', // Path to compiled migrations
    pathTs: './src/migrations', // Path to TypeScript migration files
    tableName: 'mikro_orm_migrations', // Custom table name for migrations
  },
};

export default config;
