import {
    AutoIncrement, BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import User from "src/models/User";

@Table
class Tasks extends Model<Tasks> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    title: string;

    @Column({
        type: DataType.STRING
    })
    completed: string;

    // @ts-ignore
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    // @ts-ignore
    @BelongsTo(() => User)
    user: User
}

export default Tasks;