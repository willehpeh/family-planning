DO $$
    DECLARE
        table_name text;
    BEGIN
        -- Replace with your list of tenant-isolated tables
        FOR table_name IN SELECT unnest(ARRAY ['todo_list', 'todo_list_item'])
            LOOP
                -- Enable Row-Level Security on the table
                EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', table_name);

                -- Drop existing policy to avoid conflicts
                EXECUTE format('DROP POLICY IF EXISTS tenant_isolation_policy ON %I;', table_name);

                -- Create a policy to restrict access based on tenant_id
                EXECUTE format(
                        'CREATE POLICY tenant_isolation_policy
                         ON %I
                         FOR ALL
                         USING (householdId = current_setting(''app.tenant_id'')::uuid);',
                        table_name
                        );
            END LOOP;
    END $$;
