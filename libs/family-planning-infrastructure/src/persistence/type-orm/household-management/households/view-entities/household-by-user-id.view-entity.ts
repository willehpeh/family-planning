import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT
  h.id AS id,
  h.name AS name,
  hm."userId"
  FROM household h,
  LATERAL jsonb_array_elements_text(h."memberIds") AS memberId
  JOIN household_member hm
  ON memberId = hm.id
  `
})
export class HouseholdByUserIdView {
  @ViewColumn()
  id: string;

  @ViewColumn()
  name: string;

  @ViewColumn()
  userId: string;
}
