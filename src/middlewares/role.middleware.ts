
import { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
export const roleMiddleware = (roles: string[]): MiddlewareHandler => {
    return createMiddleware(async (c, next) => {
      // const user = c.get('user') // assumes a user is already added to context
      
      console.log('roles', roles)
      // if (!user || !roles.includes(user.role)) {
        // return c.text('Forbidden', 403)
      // }
  
      await next()
    })
  }

export type TRoleVariables = {
   
};