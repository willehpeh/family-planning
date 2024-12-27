import { IsNotEmpty, IsString } from 'class-validator';

export class POSTCreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
