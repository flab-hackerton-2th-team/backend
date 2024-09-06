import { Migration } from '@mikro-orm/migrations';

export class Migration20240906192931 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "interview_contents" ("id" bigserial primary key, "content" text not null, "speaker" varchar(20) not null, "interview_id" bigint not null);');

    this.addSql('create table "reviewer" ("id" bigserial primary key, "presona" jsonb not null);');

    this.addSql('create table "interview" ("id" bigserial primary key, "title" varchar(20) not null, "reviewer_id" bigint not null, "interviewer_id" bigint not null, "status" varchar(10) not null);');

    this.addSql('alter table "interview_contents" add constraint "interview_contents_interview_id_foreign" foreign key ("interview_id") references "interviewer" ("id") on update cascade;');

    this.addSql('alter table "interview" add constraint "interview_reviewer_id_foreign" foreign key ("reviewer_id") references "reviewer" ("id") on update cascade;');
    this.addSql('alter table "interview" add constraint "interview_interviewer_id_foreign" foreign key ("interviewer_id") references "interviewer" ("id") on update cascade;');

    this.addSql('alter table "interviewer" alter column "name" type varchar(20) using ("name"::varchar(20));');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "interview" drop constraint "interview_reviewer_id_foreign";');

    this.addSql('drop table if exists "interview_contents" cascade;');

    this.addSql('drop table if exists "reviewer" cascade;');

    this.addSql('drop table if exists "interview" cascade;');

    this.addSql('alter table "interviewer" alter column "name" type varchar(255) using ("name"::varchar(255));');
  }

}
