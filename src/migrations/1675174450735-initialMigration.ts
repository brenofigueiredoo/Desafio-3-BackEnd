import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1675174450735 implements MigrationInterface {
    name = 'initialMigration1675174450735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "updateAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "updatedAt" TO "updateAt"`);
    }

}
