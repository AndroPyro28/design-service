// controllers/index.controller.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  TAuthVariables,
} from "../../middlewares/auth.middleware";
import DesignService from "./design.service";
import { CreateDesignSchema, CreateOrUpdateDesignSchema, DeleteDesignSchema, ParamsDesignSchema } from "../../schema/design";
import { roleMiddleware } from "../../middlewares/role.middleware"; // for role based auth
    
// protected by auth middleware

const designControllers = new Hono<{ Variables: TAuthVariables }>()

  .post("/", zValidator('json', CreateDesignSchema), async (c) => {
    const body = c.req.valid("json");
    const { userId } = c.get("user");
    try {
      const data = await DesignService.createDesign(userId, body);
      return c.json({data}, 201)
    } catch (error) {
      return c.json(
        {
          message: "Something went wrong",
        },
        500
      );
    }
  })

  .get("/", 
    // roleMiddleware(['ADMIN', 'STUDENT']),
  async (c) => {
    try {
      const { userId } = c.get("user");
      const designs = await DesignService.getDesignsByUserId(userId);

      return c.json({ data:designs }, 200);

    } catch (error) {
      return c.json(
        {
          message: "Something went wrong",
        },
        500
      );
    }
  })

  .get("/:id", zValidator('param', ParamsDesignSchema), async (c) => {
    try {
      const { userId } = c.get("user");
      const designId = c.req.valid('param').id
      const design = await DesignService.getDesignById(designId);
      if (!design || !design.id) {
        return c.json(
          {
            message: "Design not found",
          },
          404
        );
      }

      if (design.userId != userId) {
        return c.json(
          {
            message: "Unauthorized access",
          },
          401
        );
      }

      return c.json({ data:design }, 200);
    } catch (error) {
      return c.json(
        {
          message: "Something went wrong",
        },
        500
      );
    }
  })

  .put("/", zValidator("json", CreateOrUpdateDesignSchema), async (c) => {
    try {
      const { userId } = c.get("user");
      const body = c.req.valid("json");

      if(!body?.id) {
        const newDesign = await DesignService.createDesign(userId, body)
        return c.json({ data: newDesign }, 201);
      }

      const { id } = body;

      const design = await DesignService.getDesignById(id);
      
      if (!design || !design.id) {
        return c.json(
          {
            message: "Design Not Found",
          },
          404
        );
      }

      // else if there's existing design

      // check user authenticity
      if (design.userId != userId) {
        return c.json(
          {
            message: "Unauthorized access",
          },
          401
        );
      }

      const updatedDesign = await DesignService.updateDesign(design.id, body);

      return c.json({ data: updatedDesign }, 200);

    } catch (error) {
      return c.json(
        {
          message: "Something went wrong",
        },
        500
      );
    }
  })

  .delete('/:id', zValidator('param', DeleteDesignSchema), async (c) => {
    try {
      const { userId } = c.get("user");
      const designId = c.req.valid('param').id
      const design = await DesignService.getDesignById(designId);

      // check if there's existing design
      if (!design || !design.id) {
        return c.json(
          {
            message: "Design Not found",
          },
          404
        );
      }

      // check user authenticity
      if (design.userId != userId) {
        return c.json(
          {
            message: "Unauthorized access",
          },
          401
        );
      }

      // perform deletion

      const updatedDesign = await DesignService.deleteDesign(design.id);

      return c.json({ data: updatedDesign }, 200);
    } catch (error) {
      return c.json(
        {
          message: "Something went wrong",
        },
        500
      );
    }
  })

export default designControllers;