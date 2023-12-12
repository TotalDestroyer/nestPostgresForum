import {forwardRef, Module} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {FriendsRequestsModel} from "./friends-requests.model";
import {FriendsModel} from "./friends.model";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [
    SequelizeModule.forFeature([FriendsRequestsModel, FriendsModel]),
      forwardRef(() => UserModule),
      forwardRef(() => AuthModule),
  ]
})
export class FriendsModule {}
