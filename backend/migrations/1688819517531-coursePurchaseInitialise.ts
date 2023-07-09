import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursePurchaseInitialise1688819517531 implements MigrationInterface {
    name = 'CoursePurchaseInitialise1688819517531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coursePurchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" character varying NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "paidAt" TIMESTAMP NOT NULL, "purchaseId" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "courseId" uuid, CONSTRAINT "PK_5521162d75df1b5287c0da08d98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD CONSTRAINT "FK_a18c56f5b37dff7ce0d04205738" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" ADD CONSTRAINT "FK_932315a9dacc0fcd4780e3d5c0f" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP CONSTRAINT "FK_932315a9dacc0fcd4780e3d5c0f"`);
        await queryRunner.query(`ALTER TABLE "coursePurchase" DROP CONSTRAINT "FK_a18c56f5b37dff7ce0d04205738"`);
        await queryRunner.query(`DROP TABLE "coursePurchase"`);
    }

}
