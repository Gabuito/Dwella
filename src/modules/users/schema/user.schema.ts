import { z } from 'zod';

/*
/schemas:

[POST] new user = {
  name: string,
  birthDate: Date,
  email: string,
  password: string,
  type: number,  
} -> all required

[PUT] same new user && new_password: string && old_password: string -> all required; has id (UUIDv7) in req.params

[PATCH] update user = {
  name?: string,
  birthDate?: Date,
  email?: string,
  new_password: string ?  new_password: string && old_password: string : undefined,
  type?: number,  
} if all undefined -> exception err and block; has id (UUIDv7) in req.params;
Problem: If User is ADMIN, he can change user without old_password

[DELETE] delete user = {
} Has id (UUIDv7) in req.params;

[GET] get user = {} Has id (UUIDv7) in req.params;

[GET] get all users = {} Req.params may have limit, page, sort, date_start, date_end, search -> all optional; If any exists, need to validate; If has more params beyond this, exception err and block; 

*/

// Simple constant for admin role check
export const ADMIN_ROLE = 1;

// Base user schema with common properties
const userBaseSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  birthDate: z.coerce.date(),
  role: z.number().int().min(1), // Any number, 1 is admin, others are regular users
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});

// Schema for creating a new user (POST)
export const createUserSchema = userBaseSchema.extend({
  password: z.string().min(8),
});

// Schema for UUID validation
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Schema for user ID in params
export const userIdParamSchema = z.object({
  id: uuidSchema,
});

// JWT user info from middleware
export const jwtUserSchema = z.object({
  id: z.string().uuid(),
  role: z.number().int().min(1),
});

// Schema for updating user entirely (PUT) with conditional password validation
export const putUserSchema = createUserSchema.extend({
  old_password: z.string().optional(),
  new_password: z.string().min(8).optional(),
}).superRefine((data, ctx) => {
  // We'll validate this with the actual JWT user info in the controller
  // For schema purposes, we make password fields optional but will check in controller
});

// Schema for partial user update (PATCH)
export const patchUserBaseSchema = userBaseSchema.partial().refine(
  data => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" }
);

// Password change schema for regular users
export const passwordChangeSchema = z.object({
  old_password: z.string(),
  new_password: z.string().min(8),
});

// PATCH schema with conditional password validation - will be checked in controller
export const patchUserSchema = patchUserBaseSchema.extend({
  new_password: z.string().min(8).optional(),
  old_password: z.string().optional(),
});

// Query parameters schema for GET all users
export const getAllUsersQuerySchema = z.object({
  limit: z.coerce.number().positive().optional(),
  page: z.coerce.number().nonnegative().optional(),
  sort: z.string().optional(),
  date_start: z.coerce.date().optional(),
  date_end: z.coerce.date().optional(),
  search: z.string().optional(),
}).strict(); // This ensures no additional parameters are allowed

// Schema for user authentication
export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Schema for user response (what is sent back to the client)
export const userResponseSchema = userBaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).omit({ password: true });

// Helper function to validate password requirements for non-admin users
export function validatePasswordRequirements(
  data: Record<string, any>, 
  requestUser: { id: string; role: number },
  targetUserId: string
): { isValid: boolean; errorMessage?: string } {
  // If user is admin, no password validation needed
  if (requestUser.role === ADMIN_ROLE) {
    return { isValid: true };
  }
  
  // Non-admin users can only update their own accounts
  if (requestUser.id !== targetUserId) {
    return { 
      isValid: false, 
      errorMessage: "Non-admin users can only update their own accounts"
    };
  }

  // For password changes, old password is required
  if (data.new_password && !data.old_password) {
    return { 
      isValid: false, 
      errorMessage: "Old password is required when changing password"
    };
  }

  return { isValid: true };
}

// Types derived from schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type PutUserInput = z.infer<typeof putUserSchema>;
export type PatchUserInput = z.infer<typeof patchUserSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type GetAllUsersQuery = z.infer<typeof getAllUsersQuerySchema>;
export type UserAuthInput = z.infer<typeof userAuthSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type JwtUser = z.infer<typeof jwtUserSchema>;