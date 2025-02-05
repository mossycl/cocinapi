import { Injectable } from '@nestjs/common';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class RecipeService {
    constructor(private dbService : DbService){}
        async getRecipes(userId : number){
            let recipes = await this.dbService.recipe.findMany({
                where: {
                    userId : userId
                }
            })
            return {
                recipes : recipes
            }
        }
    
        async getRecipeById(userId : number, recipeId : number){
            let recipe = await this.dbService.recipe.findUnique({
                where : {
                    userId : userId,
                    recipeId : recipeId
                }
            })
            return recipe
        }
    
        editRecipe(userId : number, recipeId : number, dto: EditRecipeDto){
    
        }
    
        createRecipe(userId : number, dto : CreateRecipeDto){
    
        }
    
        deleteRecipe(){
    
        }
}
