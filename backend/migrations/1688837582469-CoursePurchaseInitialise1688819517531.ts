import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursePurchaseInitialise16888195175311688837582469 implements MigrationInterface {
    name = 'CoursePurchaseInitialise16888195175311688837582469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP COLUMN "purchaseId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD "purchaseId" character varying NOT NULL`);
    }

}
