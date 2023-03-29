import { Model, DataTypes, InferCreationAttributes, InferAttributes, CreationOptional } from 'sequelize'
import sequelize from '../db/db.js';

interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
    id: CreationOptional<number>;
    name: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    isChecked: boolean;
}



export const User = sequelize.define<IUser>('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    createdAt: {type: DataTypes.STRING, defaultValue: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`},
    updatedAt: {type: DataTypes.STRING, defaultValue: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`},
    status: {type: DataTypes.STRING, defaultValue: 'unBlock'},
    isChecked: {type: DataTypes.BOOLEAN, defaultValue: false},
})

