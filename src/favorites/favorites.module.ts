import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import {TitleModule} from "../title/title.module";
import {CharacterModule} from "../character/character.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Favorites} from "./models/favorites.model";

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
      SequelizeModule.forFeature([Favorites]),
      TitleModule,
      CharacterModule,
  ],
    exports: [FavoritesService]
})
export class FavoritesModule {}
