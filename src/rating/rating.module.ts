import {forwardRef, Module} from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Rating} from "./rating.model";
import {WatchListItemModule} from "../watch-list-item/watch-list-item.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [RatingService],
  controllers: [RatingController],
  imports: [
    SequelizeModule.forFeature([Rating]),
      WatchListItemModule,
    forwardRef(() => AuthModule)

  ]
})
export class RatingModule {}
