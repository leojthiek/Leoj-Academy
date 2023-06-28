import { MigrationInterface, QueryRunner } from "typeorm";

export class ContentEntityInitial1687954575744 implements MigrationInterface {
    name = 'ContentEntityInitial1687954575744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "videoURL" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "content"`);
    }

}
