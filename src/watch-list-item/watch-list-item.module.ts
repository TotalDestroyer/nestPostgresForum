import {forwardRef, Module} from '@nestjs/common';
import { WatchListItemController } from './watch-list-item.controller';
import { WatchListItemService } from './watch-list-item.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {WatchListItem} from "./watch-list-item.model";
import {WatchList} from "../watch-list/watch-list.model";
import {AuthModule} from "../auth/auth.module";
@Module({
  controllers: [WatchListItemController],
  providers: [WatchListItemService],
  imports: [
    SequelizeModule.forFeature([WatchListItem]),
    SequelizeModule.forFeature([WatchList]),
    forwardRef(() => AuthModule)

  ],
  exports: [
      WatchListItemService
  ]
})
export class WatchListItemModule {}
