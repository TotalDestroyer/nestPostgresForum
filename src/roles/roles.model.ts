import {Column, Model, Table, BelongsToMany} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'Roles'})
export class Role extends Model<Role, RoleCreationAttrs>{

    @ApiProperty({example: "1", description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "ADMIN", description: "user role value"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: "Administrator", description: "Role description"})
    @Column({type: DataTypes.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]

}