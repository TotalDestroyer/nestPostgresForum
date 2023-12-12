import {Column, ForeignKey, Model, Table} from "sequelize-typescript";

import {Character} from "../../character/character.model";
import {Favorites} from "./favorites.model";
import {DataTypes} from "sequelize";

interface favoritesCharacterCreationAttrs {
    favoriteId: number
    characterId: number;
}


@Table({tableName: 'FavoriteCharacters', timestamps: false,})
export class FavoritesCharacter extends Model<FavoritesCharacter, favoritesCharacterCreationAttrs> {

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Favorites)
    @Column
    favoriteId: number;

    @ForeignKey(() => Character)
    @Column
    characterId: number;
}