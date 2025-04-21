// controllers/index.controller.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  TAuthVariables,
} from "../../middlewares/auth.middleware";
import { CreateDesign, UpdateDesign } from "../../schema/design";
import DesignService from "./design.service";

const designControllers = new Hono<{ Variables: TAuthVariables }>()

  .post("/", zValidator("json", CreateDesign), async (c) => {
    const body = c.req.valid("json");
    const { userId } = c.get("user");
    try {
      const data = await DesignService.createDesign({ userId, data: body });

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

  .get("/:designId", async (c) => {
    try {
      const { userId } = c.get("user");

      const designId = c.req.param("designId");

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


  .put("/:designId", zValidator("json", UpdateDesign), async (c) => {
    try {
      const body = c.req.valid("json");

      const { userId } = c.get("user");

      const designId = c.req.param("designId");

      const design = await DesignService.getDesignById(designId);

      if (!design || !design.id) {
        return c.json(
          {
            message: "Design not found",
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
  });

export default designControllers;
