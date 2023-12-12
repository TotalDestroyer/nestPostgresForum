import {BelongsToMany, Column, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {TitleCharacters} from "../character/title-characters";
import {Character} from "../character/character.model";
import {Genre} from "../genre/genre.model";
import {TitleGenres} from "../genre/title-genres";
import {Type} from "../type/type.model";
import {TitleType} from "../type/title-type";
import {WatchListItem} from "../watch-list-item/watch-list-item.model";
import {Comments} from "../comments/models/comments.model";
import {Rating} from "../rating/rating.model";
import {Favorites} from "../favorites/models/favorites.model";
import {FavoritesTitle} from "../favorites/models/favorites-title.model";
import {ApiProperty} from "@nestjs/swagger";

interface TitleCreationAttrs {
    poster: string;
    name: string;
    description: string | null;
    episodes: number | null;
    episodeLength: number | null;
    characters: number[] | null;
    types: number[] | null;
    genres: number[] | null;
    releasedOn: Date | null;
    ageRating: string | null;
}

@Table({tableName: 'Titles'})
export class Title extends Model<Title, TitleCreationAttrs>{

    @ApiProperty({example: 1, description: "Uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "no-poster.png", description: "poster"})
    @Column({type: DataTypes.STRING, defaultValue: "no-poster.png"})
    poster: string;

    @ApiProperty({example: "Hellsing Ultimate", description: "poster"})
    @Column({type: DataTypes.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: "There exist creatures of darkness and evil that plague the night, devouring any human unfortunate", description: "description"})
    @Column({type: DataTypes.TEXT, allowNull: true})
    description: string;

    @ApiProperty({example: 10, description: "episodes"})
    @Column({type: DataTypes.INTEGER, allowNull: true})
    episodes: number;

    @ApiProperty({example: 49, description: "time of one episode"})
    @Column({type: DataTypes.INTEGER, allowNull: true})
    episodeLength: number;

    @ApiProperty({example: 3-11-2023, description: "release date"})
    @Column({type: DataTypes.DATE, allowNull: true})
    releasedOn: Date;

    @ApiProperty({example: "R+", description: "age rating"})
    @Column({type: DataTypes.STRING, allowNull: true})
    ageRating: string;

    @ApiProperty({type: ()=> [Character]})
    @BelongsToMany(() => Character, () => TitleCharacters)
    characters: Character[];

    @ApiProperty({type: () => [Genre]})
    @BelongsToMany(() => Genre, () => TitleGenres)
    genres: Genre[];
    @ApiProperty({type: () => [Type]})
    @BelongsToMany(() => Type, () => TitleType)
    types: Type[];

    @HasMany(() => WatchListItem)
    watchListItems: WatchListItem[]

    @HasMany(() => Comments)
    comments: Comments[]

    @HasMany(() => Rating)
    userRates: Rating[]

    @BelongsToMany(() => Favorites, () => FavoritesTitle)
    inFavorites: Favorites[];
}
