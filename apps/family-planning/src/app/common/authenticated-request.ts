export type AuthenticatedRequest = Request & {
  userId: string;
  userLastName: string;
  userFirstName: string;
  userEmail: string;
  username: string;
}
