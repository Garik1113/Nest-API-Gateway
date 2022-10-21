import { ArrayMinSize, IsArray, IsEmail, IsString } from "class-validator";
import { Match } from "../decorators/user.decorator";


export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string

    @Match('password', {message: "Passwords don't match"})
    @IsString()
    confirmPassword: string

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    roles: string[];
}