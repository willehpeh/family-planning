import {
  HouseholdCommandRepository,
  TodoListsCommandRepository,
  TodoListsQueryRepository
} from '@family-planning/domain';

export interface RepositoryProvider {
  todoListsCommandRepository(): TodoListsCommandRepository;
  todoListsQueryRepository(): TodoListsQueryRepository;
  householdCommandRepository(): HouseholdCommandRepository;
}
