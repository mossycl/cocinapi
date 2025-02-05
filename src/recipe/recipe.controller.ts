import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards( JwtGuard )
@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService){}

    @Get()
    getRecipes(@GetUser() user : User){
        const userId = user.userId;
        return this.recipeService.getRecipes(userId);
    }

    @Get(':id')
    getRecipeById(@GetUser() user : User, @Param('id', ParseIntPipe) recipeId : number){
        const userId = user.userId;
        return this.recipeService.getRecipeById(userId, recipeId)
    }

    @Patch()
    editRecipe(@GetUser() user : User, @Param('id', ParseIntPipe) recipeId : number, @Body() dto : EditRecipeDto){

    }

    @Post()
    createRecipe(@GetUser() user : User, @Body() dto : CreateRecipeDto){

    }

    @Delete()
    deleteRecipe(@GetUser() user : User){

    }
}
