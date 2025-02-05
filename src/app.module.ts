import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from '../src/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }), 
    AuthModule, 
    DbModule, UserModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
