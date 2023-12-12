import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Favorites} from "./favorites.model";
import {Title} from "../../title/title.model";


interface favoriteTitlesCreationAttrs {
    favoriteId: number
    titleId: number;
}
@Table({tableName: 'FavoriteTitles', timestamps: false})
export class FavoritesTitle extends Model<FavoritesTitle, favoriteTitlesCreationAttrs> {

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Favorites)
    @Column
    favoriteId: number;

    @ForeignKey(() => Title)
    @Column
    titleId: number;
}