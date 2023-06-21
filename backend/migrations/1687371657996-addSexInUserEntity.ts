import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSexInUserEntity1687371657996 implements MigrationInterface {
    name = 'AddSexInUserEntity1687371657996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "sex" character varying NOT NULL DEFAULT 'male'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sex"`);
    }

}
