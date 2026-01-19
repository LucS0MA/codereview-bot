import { User } from "@prisma/client";


// For creating a new user (without id and timestamps)
export type CreateUserInput = Omit<User, "id" | "createdAt">;

// Full user type (already from Prisma)
export type UserModel = User;

// For updating a user
export type UpdateUserInput = Partial<Omit<User, "id" | "createdAt">>;