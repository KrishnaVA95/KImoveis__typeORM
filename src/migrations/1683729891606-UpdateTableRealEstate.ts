import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateTableRealEstate1683729891606 implements MigrationInterface {
    name = 'UpdateTableRealEstate1683729891606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(2,0)`);
    }

}
