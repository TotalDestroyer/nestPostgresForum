import {BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Title} from "../../title/title.model";
import {User} from "../../user/user.model";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {Like} from "./like.model";
import {Dislike} from "./dislike.model";

interface commentCreationAttrs {
    titleId: number;
    userId: number;
    body: string;
}

@Table({tableName: 'Comments'})
export class Comments extends Model<Comments, commentCreationAttrs>{
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 54, description: "title id"})
    @ForeignKey(() => Title)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    titleId: number;

    @BelongsTo(() => Title)
    title: Title;

    @ApiProperty({example: 1, description: "user id"})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @ApiProperty({example: "i like it", description: "comment body"})
    @Column({type: DataTypes.TEXT, allowNull: false})
    body: string;

    @HasMany(() => Like, {as: "likes"})
    likes: Like[];

    @HasMany(() => Dislike, {as: 'dislikes'})
    dislikes: Dislike[];
}