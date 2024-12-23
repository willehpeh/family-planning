export type HouseholdInfo = {
  id: string;
  name: string;
  members: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[]
  pendingMembers: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[]
}
