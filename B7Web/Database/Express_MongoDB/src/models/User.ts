import { Schema, model, Model, connection } from 'mongoose';

type UserType = {
    email: string,
    age: number,
    interests: [string],
    name: {
        firstName: string,
        lastName: string
    }
}

const schema = new Schema<UserType>({
    email: { type: String, required: true },
    age: Number,
    interests: [String],
    name: {
        firstName: String,
        lastName: String
    }
});

const modelName: string = 'User';

// Create model on all exports
// export default model<UserTtype>(modelName, schema);

// Create model only if isn't connected
export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<UserType> :
    model<UserType>(modelName, schema);


export const createUser = async (data: UserType) => {
    try {
        const User = connection.models[modelName];
        let newUser = new User();
        newUser.name.firstName = data.name.firstName;
        newUser.name.lastName = data.name.lastName;
        newUser.email = data.email;
        newUser.age = data.age;
        newUser.interests = data.interests;

        console.log(newUser);

        return await newUser.save(); 
    } catch(error) {
        console.log(error);
        return false
    }
}