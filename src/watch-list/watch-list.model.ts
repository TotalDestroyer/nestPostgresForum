import {
    Column,
    Model,
    Table,
    BelongsToMany,
    ForeignKey,
    DataType,
    BelongsTo,
    HasMany,
    HasOne
} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";
import {WatchListItem} from "../watch-list-item/watch-list-item.model";

interface WatchListCreationAttrs {
    userId: number;
}


@Table({tableName: 'WatchLists'})
export class WatchList extends Model<WatchList, WatchListCreationAttrs> {
    @ApiProperty({example: "1", description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: "user id"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ApiProperty({type: () => User})
    @BelongsTo(() => User)
    user: User;

    @ApiProperty({type: ()=> [WatchListItem]})
    @HasMany(() => WatchListItem)
    items: WatchListItem[];

}