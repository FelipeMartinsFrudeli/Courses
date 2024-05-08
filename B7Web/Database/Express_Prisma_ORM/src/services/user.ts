import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"

// type CreateUserProps = {
//     name: string;
//     email: string;
// }

// Promisse <false | User>
// Promisse return -> false or User <false | User>

// Error Types
// if (error instanceof Prisma.PrismaClientKnownRequestError) {
//     // email already exists
//     if(error.code === 'P2002') {}
// }

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({ data });
    } catch (error) {
        return false;
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        });
    } catch (error) {
        return false;
    }
}