import { RepositoryProvider } from './repository-provider';

export interface UnitOfWork {
  transaction<T>(operation: (repositories: RepositoryProvider) => Promise<T>): Promise<T>;
}
