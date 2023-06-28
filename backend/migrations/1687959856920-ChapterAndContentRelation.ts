import { MigrationInterface, QueryRunner } from "typeorm";

export class ChapterAndContentRelation1687959856920 implements MigrationInterface {
    name = 'ChapterAndContentRelation1687959856920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" ADD "chapterId" uuid`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_795c0437bce51c85049ebecbbe2" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_795c0437bce51c85049ebecbbe2"`);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "chapterId"`);
    }

}
