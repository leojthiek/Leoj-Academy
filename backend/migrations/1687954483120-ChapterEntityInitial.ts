import { MigrationInterface, QueryRunner } from "typeorm";

export class ChapterEntityInitial1687954483120 implements MigrationInterface {
    name = 'ChapterEntityInitial1687954483120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chapter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Chapter_title" character varying NOT NULL, "Chapter_description" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chapter"`);
    }

}
