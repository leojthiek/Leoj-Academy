import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletingRelation1688896431610 implements MigrationInterface {
    name = 'DeletingRelation1688896431610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP CONSTRAINT "FK_a18c56f5b37dff7ce0d04205738"`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP CONSTRAINT "FK_932315a9dacc0fcd4780e3d5c0f"`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP COLUMN "courseId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD CONSTRAINT "FK_932315a9dacc0fcd4780e3d5c0f" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD CONSTRAINT "FK_a18c56f5b37dff7ce0d04205738" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
