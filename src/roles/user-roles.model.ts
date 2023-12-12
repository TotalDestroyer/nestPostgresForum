import {Column, Model, Table, ForeignKey} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Role} from "./roles.model";
import {User} from "../user/user.model";



@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataTypes.INTEGER, unique: true, allowNull: false})
    role: number;

    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    userId: number;

}