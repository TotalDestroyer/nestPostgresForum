import {Module} from "@nestjs/common";
import { UserModule } from './user/user.module';
import {SequelizeModule} from "@nestjs/sequelize";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import { TitleModule } from './title/title.module';
import { TypeModule } from './type/type.module';
import { GenreModule } from './genre/genre.module';
import { CharacterModule } from './character/character.module';
import {User} from "./user/user.model";
import {UserRoles} from "./roles/user-roles.model";
import {Title} from "./title/title.model";
import {TitleCharacters} from "./character/title-characters";
import {TitleType} from "./type/title-type";
import {TitleGenres} from "./genre/title-genres";
import {Role} from "./roles/roles.model";
import {Genre} from "./genre/genre.model";
import {Character} from "./character/character.model";
import {Type} from "./type/type.model";
import { WatchListModule } from './watch-list/watch-list.module';
import { WatchListItemModule } from './watch-list-item/watch-list-item.module';
import {WatchList} from "./watch-list/watch-list.model";
import {WatchListItem} from "./watch-list-item/watch-list-item.model";
import { CommentsModule } from './comments/comments.module';
import {Comments} from "./comments/models/comments.model";
import {AuthModule} from "./auth/auth.module";
import { FriendsModule } from './friends/friends.module';
import {FriendsRequestsModel} from "./friends/friends-requests.model";
import {FriendsModel} from "./friends/friends.model";
import { RatingModule } from './rating/rating.module';
import {Rating} from "./rating/rating.model";

import {FavoritesModule } from './favorites/favorites.module';
import {Favorites} from "./favorites/models/favorites.model";
import {FavoritesCharacter} from "./favorites/models/favorites-character.model";
import {FavoritesTitle} from "./favorites/models/favorites-title.model";
import { ChangePasswordModule } from './change-password/change-password.module';
import { ChangeEmailModule } from './change-email/change-email.module';
import env from "./env";
import {Like} from "./comments/models/like.model";
import {Dislike} from "./comments/models/dislike.model";
import * as path from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [env],
        }),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        SequelizeModule.forRoot(
            {
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [
                    User, Role, UserRoles, Title, Genre,
                    Character, Type, TitleCharacters, TitleType,
                    TitleGenres, WatchList, WatchListItem, Comments,
                    FriendsRequestsModel, FriendsModel, Rating, Favorites,
                    FavoritesCharacter, FavoritesTitle, Like, Dislike
                ],
                autoLoadModels: true
            }),
        UserModule,
        TitleModule,
        TypeModule,
        GenreModule,
        CharacterModule,
        WatchListModule,
        WatchListItemModule,
        CommentsModule,
        AuthModule,
        FriendsModule,
        RatingModule,
        FavoritesModule,
        ChangePasswordModule,
        ChangeEmailModule
    ]
})
export class AppModule {

}