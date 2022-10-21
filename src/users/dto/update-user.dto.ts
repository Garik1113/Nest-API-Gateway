import { ArrayMinSize, IsArray, IsEmail, IsString } from "class-validator";
import { Match } from "../decorators/user.decorator";


export class UpdateUserDto {
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    roles: string[];
}