import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import {User} from "../user/user.model";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'friends-requests'})
export class FriendsRequestsModel extends Model {

    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: "user sender id"})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    senderId: number;

    @ApiProperty({example: 32, description: "user taker id"})
    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    takerId: number;

    @ApiProperty({example: false, description: "is request accepted"})
    @Column({type: DataTypes.BOOLEAN, defaultValue: false})
    accept: boolean;

    @ApiProperty({type: () => User, description: "user sender"})
    @BelongsTo(() => User, 'senderId')
    sender: User;

    @ApiProperty({type: () => User, description: "user taker"})
    @BelongsTo(() => User, 'takerId')
    taker: User;
}