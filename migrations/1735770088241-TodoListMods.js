module.exports = class TodoListMods1735770088241 {
    name = 'TodoListMods1735770088241'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD "dateCompleted" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56" FOREIGN KEY ("listId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP COLUMN "dateCompleted"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD CONSTRAINT "FK_5ba34e4ff66a08d000c35509a56" FOREIGN KEY ("listId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
