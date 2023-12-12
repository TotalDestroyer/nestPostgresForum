import {forwardRef, Module} from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Title} from "./title.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [TitleService],
  controllers: [TitleController],
  imports: [
    SequelizeModule.forFeature([Title]),
    FilesModule,
    forwardRef(() => AuthModule)

  ],
  exports: [
      TitleService
  ]
})
export class TitleModule {}
