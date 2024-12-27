import { IsNotEmpty, IsString } from 'class-validator';

export class POSTAddItemToTodoListDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
