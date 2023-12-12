import {Column, Model, Table, ForeignKey} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Character} from "./character.model";
import {Title} from "../title/title.model";



@Table({tableName: 'title-characters',  timestamps: false})
export class TitleCharacters extends Model<TitleCharacters>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Character)
    @Column({type: DataTypes.INTEGER, unique: true, allowNull: false})
    character: number;

    @ForeignKey(() => Title)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    titleId: number;
}