import {Column, Model, Table, BelongsToMany} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
import {Title} from "../title/title.model";
import {TitleGenres} from "./title-genres";

interface GenreCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'Genres'})
export class Genre extends Model<Genre, GenreCreationAttrs> {

    @ApiProperty({example: "1", description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Supernatural", description: "name of genre"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: "A genre where the main emphasis is on ...", description: "description of genre"})
    @Column({type: DataTypes.TEXT, allowNull: true})
    description: string;

    @BelongsToMany(() => Title, () => TitleGenres)
    titles: Title[];
}