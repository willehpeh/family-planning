const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SplitTodoListAggregate1738536765110 {
    name = 'SplitTodoListAggregate1738536765110'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56"`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD "itemIds" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ALTER COLUMN "listId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56" FOREIGN KEY ("listId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ALTER COLUMN "listId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_list" DROP COLUMN "itemIds"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56" FOREIGN KEY ("listId") REFERENCES "todo_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
