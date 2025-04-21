import { category, Design as DesignModel } from "@prisma/client";
import { z } from "zod";

export const DesignSchema = z.object({
    id: z.string().cuid(),
    userId: z.string().min(1, 'User ID required'),
    name: z.string().min(1, 'Name required'),
    canvasData: z.string().min(1, 'Canvas Data required'),
    width: z.number().min(1, 'width required'),
    height: z.number().min(1, 'height required'),
    category: z.nativeEnum(category),
    createdAt: z.date(),
    updatedAt: z.date()
}) satisfies z.ZodType<DesignModel>;

export type TDesignSchema = z.infer<typeof DesignSchema>

export const CreateDesignSchema = DesignSchema.pick({
    userId: true,
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
})
export const ParamsDesignSchema = DesignSchema.pick({
    id:true
})

export type TCreateDesignSchema = z.infer<typeof CreateDesignSchema>

export const UpdateDesignSchema = CreateDesignSchema.pick({
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
    userId:true
})

export type TUpdateDesignSchema = z.infer<typeof UpdateDesignSchema>

export const DeleteDesignSchema = DesignSchema.pick({
    id:true
})

