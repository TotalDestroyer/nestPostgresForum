import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {DataTypes} from "sequelize";
import {User} from "../../user/user.model";
import {Title} from "../../title/title.model";
import {Character} from "../../character/character.model";
import {FavoritesTitle} from "./favorites-title.model";
import {FavoritesCharacter} from "./favorites-character.model";

interface favoritesCreationAttrs {
    userId: number
}

@Table({tableName: 'Favorites',})
export class Favorites extends Model<Favorites, favoritesCreationAttrs> {

    @ApiProperty({example: 1, description:  "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @ApiProperty({example: 1, description: "user id"})
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Title, () => FavoritesTitle)
    titles: Title[];

    @BelongsToMany(() => Character, () => FavoritesCharacter)
    characters: Character[];
}