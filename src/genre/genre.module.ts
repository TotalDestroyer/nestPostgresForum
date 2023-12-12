import {forwardRef, Module} from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Genre} from "./genre.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [GenreService],
  controllers: [GenreController],
  imports: [
    SequelizeModule.forFeature([Genre]),
    forwardRef(() => AuthModule)

  ]
})
export class GenreModule {}
