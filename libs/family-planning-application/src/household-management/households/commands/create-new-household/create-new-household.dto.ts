export type CreateNewHouseholdDto = {
  householdName: string;
  creatingMember: {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
  }
};
