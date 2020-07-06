import {
    AutoIncrement,
    Column,
    DataType, HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Tasks from "src/models/Tasks";

@Table
class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    // @ts-ignore
    @HasMany(() => Tasks)
    tasks: Tasks[]
}

export default User;