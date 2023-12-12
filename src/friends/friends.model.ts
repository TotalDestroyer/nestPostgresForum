import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";

interface FriendsCreationAttrs {
    id1: number;
    id2: number;
}
@Table({tableName: 'Friends'})
export class FriendsModel extends Model<FriendsModel, FriendsCreationAttrs> {

    @ApiProperty({example: 1, description:  "first user id"})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    id1: number;

    @ApiProperty({example: 128, description:  "second user id"})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    id2: number;

    @BelongsTo(() => User, {as: "firstUser"})
    user1: User;

    @BelongsTo(() => User, {as: "secondUser"})
    user2: User;
}