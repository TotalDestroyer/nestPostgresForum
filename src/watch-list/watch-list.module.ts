import { Module } from '@nestjs/common';
import { WatchListController } from './watch-list.controller';
import { WatchListService } from './watch-list.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {WatchList} from "./watch-list.model";

@Module({
  controllers: [WatchListController],
  providers: [WatchListService],
  imports: [
    SequelizeModule.forFeature([WatchList]),
  ],
  exports: [
      WatchListService
  ]
})
export class WatchListModule {}
