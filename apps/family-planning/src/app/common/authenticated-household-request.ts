import { AuthenticatedRequest } from './authenticated-request';

export type AuthenticatedHouseholdRequest = AuthenticatedRequest & {
  householdId: string;
}
