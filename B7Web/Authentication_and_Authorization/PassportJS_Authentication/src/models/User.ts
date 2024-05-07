import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UserModel extends Model {
    id: number;
    email: string;
    password: string;
}

export const User = sequelize.define<UserModel>('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
})