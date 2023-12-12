import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {EmailsModule} from "../emails/emails.module";
import {RolesModule} from "../roles/roles.module";
import {FilesModule} from "../files/files.module";
import {WatchListModule} from "../watch-list/watch-list.module";
import {FavoritesModule} from "../favorites/favorites.module";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    EmailsModule,
    RolesModule,
    FilesModule,
    WatchListModule,
    FavoritesModule,
    ConfigModule,
    forwardRef(() => AuthModule)

  ],
  exports: [
      UserService
  ]
})
export class UserModule {}
