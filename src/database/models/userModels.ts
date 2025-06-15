import {Table,Column,Model,DataType, PrimaryKey} from 'sequelize-typescript'

@Table({
    tableName:'users',
    modelName:'user',
    timestamps:true
})

class User extends Model{       //this is for hide id
       @Column({
        primaryKey : true, 
        type : DataType.UUID, 
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type:DataType.STRING,
    })
    declare username : string

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare password : string

    @Column({
        type:DataType.STRING,
        unique:true             //this is for euta email ley ek choti only
    })
    declare email : string

    @Column({
        type:DataType.ENUM('teacher','student','institute','super-admin')
    })
    declare role : string

}
export default User