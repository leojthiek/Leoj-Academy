import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndCourseRelation1687956948691 implements MigrationInterface {
    name = 'UserAndCourseRelation1687956948691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1"`);
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "userId" TO "instructorId"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6714597bea722629fa7d32124a" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6714597bea722629fa7d32124a"`);
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "instructorId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
