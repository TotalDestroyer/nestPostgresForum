import {Column, Model, Table, ForeignKey} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Title} from "../title/title.model";
import {Genre} from "./genre.model";



@Table({tableName: 'title-genres', createdAt: false, updatedAt: false})
export class TitleGenres extends Model<TitleGenres>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Genre)
    @Column({type: DataTypes.INTEGER, unique: true, allowNull: false})
    genre: number;

    @ForeignKey(() => Title)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    titleId: number;
}