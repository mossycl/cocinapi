import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateRecipeDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumber()
    cookingTime : number

    @IsNotEmpty()
    @IsString()
    ingredients : string

    @IsString()
    @IsOptional()
    directions? : string
}

export class EditRecipeDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsNumber()
    @IsOptional()
    cookingTime?: number

    @IsString()
    @IsOptional()
    ingredients?: string

    @IsString()
    @IsOptional()
    directions? : string
}