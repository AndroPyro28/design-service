// controllers/index.controller.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  TAuthVariables,
} from "../../middlewares/auth.middleware";
import DesignService from "./design.service";
import { CreateDesignSchema, DeleteDesignSchema, ParamsDesignSchema, UpdateDesignSchema } from "../../schema/design";

const designControllers = new Hono<{ Variables: TAuthVariables }>()

  .post("/", zValidator("json", CreateDesignSchema), async (c) => {
    const body = c.req.valid("json");
    const { userId } = c.get("user");
    try {
      const data = await DesignService.createDesign(userId, body);

      return c.json({ data }, 201);

    } catch (error) {
      return c.json(
        {
          message: "Something went wrong",
        },
        500
      );
    }
  })

  .get("/", async (c) => {
    try {
      // validated by middleware
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

  .put("/:id", zValidator('param', ParamsDesignSchema), zValidator("json", UpdateDesignSchema), async (c) => {
    try {
      const { userId } = c.get("user");
      const designId = c.req.valid('param').id
      const body = c.req.valid("json");

      const design = await DesignService.getDesignById(designId);

      // if there's no design, create new one
      if (!design || !design.id) {
        const design = await DesignService.createDesign(userId, body);
        return c.json(
          {
            data: design,
          },
          201
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

      // if there's no design, create new one
      if (!design || !design.id) {
        return c.json(
          {
            message: "Design Not found",
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
