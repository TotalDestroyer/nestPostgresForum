import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/user.model";
import {Comments} from "./comments.model";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
interface likeCreationAttrs {
    commentId: number;
    userId: number;
}
@Table({tableName: 'Likes'})
export class Like extends Model<Like, likeCreationAttrs> {

    @ApiProperty({name: "user id", type: Number, example: 1})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    userId: number;

    @ApiProperty({name: "comment id", type: Number, example: 1})
    @ForeignKey(() => Comments)
    @Column({type: DataTypes.INTEGER})
    commentId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Comments)
    comment: Comments;
}