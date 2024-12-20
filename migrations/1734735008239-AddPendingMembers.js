const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddPendingMembers1734735008239 {
    name = 'AddPendingMembers1734735008239'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "household" ADD "pendingMembers" jsonb NOT NULL DEFAULT '[]'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "household" DROP COLUMN "pendingMembers"`);
    }
}
