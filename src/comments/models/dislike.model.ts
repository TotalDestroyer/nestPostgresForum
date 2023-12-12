import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/user.model";
import {Comments} from "./comments.model";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
interface dislikeCreationAttrs {
    commentId: number;
    userId: number;
}
@Table({tableName: 'Dislikes'})
export class Dislike extends Model<Dislike, dislikeCreationAttrs> {

    @ApiProperty({name: "user id", type: Number, example: 1})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    userId: number;

    @ApiProperty({name: "comment id", type: Number, example: 1})
    @ForeignKey(() => Comments,)
    @Column({type: DataTypes.INTEGER})
    commentId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Comments)
    comment: Comments;
}