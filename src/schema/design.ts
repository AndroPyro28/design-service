import { category, Design as DesignModel } from "@prisma/client";
import { z } from "zod";

export const Design = z.object({
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

export type TDesign = z.infer<typeof Design>

export const CreateDesign = Design.pick({
    userId: true,
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
})

export type TCreateDesign = z.infer<typeof CreateDesign>

export const UpdateDesign = Design.pick({
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
}).partial()

export type TUpdateDesign = z.infer<typeof UpdateDesign>

export const DeleteDesign = Design.pick({
    
})

