import {Column, Model, Table, BelongsToMany, ForeignKey, DataType, BelongsTo, HasOne} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
import {WatchList} from "../watch-list/watch-list.model";
import {Title} from "../title/title.model";
import {Rating} from "../rating/rating.model";

interface WatchListItemCreationAttrs {
    titleId: number;
    watchListId: number;
}

@Table({tableName: 'WatchListItems'})
export class WatchListItem extends Model<WatchListItem, WatchListItemCreationAttrs> {

    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: "watch list id"})
    @ForeignKey(() => WatchList)
    @Column({type: DataType.INTEGER, allowNull: false,})
    watchListId: number;

    @BelongsTo(() => WatchList)
    watchList: WatchList;

    @ApiProperty({example: 32, description: "title id"})
    @ForeignKey(() => Title)
    @Column({type: DataType.INTEGER, allowNull: false,})
    titleId: number;

    @BelongsTo(() => Title)
    title: Title;

    @ApiProperty({example: 11, description: "how much series of title watched"})
    @Column({type: DataTypes.INTEGER, defaultValue: 0})
    episodesWatched: number;

    @ApiProperty({example: "planned", description: "item status"})
    @Column({type: DataTypes.STRING, defaultValue: "planned"})
    status: string;

    @HasOne(() => Rating)
    rating: Rating;

}