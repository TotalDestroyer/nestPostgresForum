import {Column, Model, Table, ForeignKey} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Title} from "../title/title.model";
import {Type} from "./type.model";



@Table({tableName: 'title-types', createdAt: false, updatedAt: false})
export class TitleType extends Model<TitleType>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Type)
    @Column({type: DataTypes.INTEGER, unique: true, allowNull: false})
    type: number;

    @ForeignKey(() => Title)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    titleId: number;

}