import {forwardRef, Module} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Character} from "./character.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [CharacterService],
  controllers: [CharacterController],
  imports: [
    SequelizeModule.forFeature([Character]),
      FilesModule,
    forwardRef(() => AuthModule)

  ],
  exports: [
    CharacterService
  ]
})
export class CharacterModule {}
