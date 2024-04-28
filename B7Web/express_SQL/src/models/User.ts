import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    name: string;
    birth_date: string;
}

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING
    },
    birth_date: {
        type: DataTypes.STRING
    }
    // defaultValue = 0
}, {
    tableName: 'users',

    // createdAt
    // updatedAt
    timestamps: false
});