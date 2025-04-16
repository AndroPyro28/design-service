
import { createMiddleware } from "hono/factory";
export const authMiddleware = createMiddleware(async (c, next) => {
  const userId = c.req.header("x-user-id")

  if(!userId) {
    return c.json({
      error: "Access denied! Please login to continue"
    }, 401)
  }

  c.set('user', {userId})
  await next();
});

export type TAuthVariables = {
  user: {
    userId: string
  }
};