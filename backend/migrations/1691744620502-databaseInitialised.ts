import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseInitialised1691744620502 implements MigrationInterface {
    name = 'DatabaseInitialised1691744620502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "videoURL" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "chapterId" uuid, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chapter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Chapter_title" character varying NOT NULL, "Chapter_description" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "courseId" uuid, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coursePurchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" character varying NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "paidAt" TIMESTAMP NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "courseId" uuid, CONSTRAINT "PK_5521162d75df1b5287c0da08d98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_name" character varying NOT NULL, "course_image" character varying NOT NULL, "course_category" character varying NOT NULL, "course_description" character varying NOT NULL, "course_instructor" character varying NOT NULL, "course_price" character varying NOT NULL, "numOfReviews" integer NOT NULL DEFAULT '0', "rating" integer NOT NULL DEFAULT '0', "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "instructorId" uuid, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "permission" character varying NOT NULL DEFAULT 'user', "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_795c0437bce51c85049ebecbbe2" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_b56f1474e3c40c58be083a7bdfd" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD CONSTRAINT "FK_a18c56f5b37dff7ce0d04205738" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD CONSTRAINT "FK_932315a9dacc0fcd4780e3d5c0f" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6714597bea722629fa7d32124a" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6714597bea722629fa7d32124a"`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP CONSTRAINT "FK_932315a9dacc0fcd4780e3d5c0f"`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP CONSTRAINT "FK_a18c56f5b37dff7ce0d04205738"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_b56f1474e3c40c58be083a7bdfd"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_795c0437bce51c85049ebecbbe2"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "coursePurchase"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`DROP TABLE "content"`);
    }

}
