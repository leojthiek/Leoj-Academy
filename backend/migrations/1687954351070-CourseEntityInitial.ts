import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseEntityInitial1687954351070 implements MigrationInterface {
    name = 'CourseEntityInitial1687954351070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_name" character varying NOT NULL, "course_image" character varying NOT NULL, "course_category" character varying NOT NULL, "course_description" character varying NOT NULL, "course_instructor" character varying NOT NULL, "course_price" character varying NOT NULL, "numOfReviews" integer NOT NULL DEFAULT '0', "rating" integer NOT NULL DEFAULT '0', "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
