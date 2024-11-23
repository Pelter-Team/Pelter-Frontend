import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response, SortOption } from "../type"
import { Graph } from "../pet/petContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export const UserListchema = z.object({
  userId: z.string(),
  username: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.enum(["admin", "customer", "foundation", "seller"]),
  created_at: z.date(),
})

export type UserList = z.infer<typeof UserListchema>

export const LoginResponseSchema = z.object({
  userId: z.number(),
  firstname: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  profileUrl: z.string().url().nullable(),
  role: z.enum(["admin", "customer", "foundation", "seller"]),
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export const RegisterRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  phone_number: z.string().optional(),
  profile_url: z.string().url("Invalid URL").optional(),
  role: z.enum(["admin", "customer", "foundation", "seller"]),
  address: z.string().optional(),
  verified: z.boolean().optional(),
  foundation_name: z.string().optional(),
})
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

export const RegisterResponseSchema = z.object({
  userId: z.number(),
  firstname: z.string(),
  surname: z.string(),
  email: z.string().email(),
  profileUrl: z.string().url().nullable(),
  role: z.enum(["admin", "customer", "foundation", "seller"]),
})

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>

const c = initContract()
export const userContract = c.router({
  login: {
    method: "POST",
    path: "/auth/login",
    body: c.type<{
      username: string
      password: string
    }>(),
    responses: {
      200: c.type<Response<LoginResponse>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  register: {
    method: "POST",
    path: "/auth/register",
    body: c.type<RegisterRequest>(),
    responses: {
      201: c.type<Response<RegisterResponse>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  logout: {
    method: "GET",
    path: "/auth/logout",
    responses: {
      200: c.type<Response<string>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  getUserList: {
    method: "GET",
    path: "/admin/users",
    responses: {
      200: c.type<Response<UserList[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  getGraphTotalUser: {
    method: "GET",
    path: "/total-user",
    responses: {
      200: c.type<Response<Graph[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    query: c.type<{
      graphRange: keyof typeof GraphSelectRangeEnumValue
    }>(),
  },
})

export enum UserType {
  All = "all",
  Customer = "customer",
  Foundation = "foundation",
}
