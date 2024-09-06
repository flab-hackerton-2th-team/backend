import { Migration } from '@mikro-orm/migrations';

export class Migration20240906183702 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "interviewer" ("id" bigserial primary key, "name" varchar(255) not null);');
  }

}
