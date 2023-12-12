import {Column, Model, Table, BelongsToMany} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
import {Title} from "../title/title.model";
import {TitleType} from "./title-type";

interface TypeCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'Types'})
export class Type extends Model<Type, TypeCreationAttrs> {

    @ApiProperty({example: 1, description: "Uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Movie", description: "type of title"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: "Movie - ", description: "description"})
    @Column({type: DataTypes.STRING, allowNull: true})
    description: string;

    @BelongsToMany(() => Title, () => TitleType)
    titles: Title[];
}