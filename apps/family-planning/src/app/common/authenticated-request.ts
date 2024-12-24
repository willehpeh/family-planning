export type AuthenticatedHouseholdRequest = Request & {
  userId: string;
  userLastName: string;
  userFirstName: string;
  userEmail: string;
  username: string;
  householdId: string;
}
