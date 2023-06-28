import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseAndChapterRelation1687957308332 implements MigrationInterface {
    name = 'CourseAndChapterRelation1687957308332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_b56f1474e3c40c58be083a7bdfd" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_b56f1474e3c40c58be083a7bdfd"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "courseId"`);
    }

}
