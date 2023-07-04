import { MigrationInterface, QueryRunner } from "typeorm";

export class TitleAndDescAddInContent1688033322740 implements MigrationInterface {
    name = 'TitleAndDescAddInContent1688033322740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "title"`);
    }

}
