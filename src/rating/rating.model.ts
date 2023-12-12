import {Column, Model, Table, BelongsToMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {User} from "../user/user.model";
import {Title} from "../title/title.model";
import {WatchListItem} from "../watch-list-item/watch-list-item.model";
import {ApiProperty} from "@nestjs/swagger";

interface RatingCreationAttrs {
    userId: number;
    titleId: number;
    watchlistItemId: number;
    rating: number;
}

@Table({tableName: 'Ratings'})
export class Rating extends Model<Rating, RatingCreationAttrs> {

    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: "user id"})
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ApiProperty({example: 54, description: "title id"})
    @ForeignKey(() => Title)
    @Column({type: DataTypes.INTEGER})
    titleId: number;

    @ApiProperty({example: 10, description: "user rate"})
    @Column({type: DataTypes.INTEGER})
    rating: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Title)
    title: Title;

    @ApiProperty({example: 10, description: "watch list item id"})
    @ForeignKey(() => WatchListItem) // Add a foreign key to WatchlistItem
    @Column({type: DataTypes.INTEGER})
    watchlistItemId: number;

    @BelongsTo(() => WatchListItem) // Establish the relationship
    watchListItem: WatchListItem;
}