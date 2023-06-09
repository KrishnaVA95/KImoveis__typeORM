import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    deletedAt: z.string().nullish(),
})

const userSchemaRequest = userSchema.omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    id: true,
})

const userSchemaUpdateRequest = userSchemaRequest.omit({
    admin: true
}).partial()

const userSchemaResponse = userSchema.omit({
    password: true,
})

const listUsersSchemaResponse = z.array(userSchemaResponse)

export {
    userSchema,
    userSchemaRequest,
    userSchemaResponse,
    listUsersSchemaResponse,
    userSchemaUpdateRequest
}
