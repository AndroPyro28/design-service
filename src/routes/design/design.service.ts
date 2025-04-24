import prisma from "../../libs/prisma"
import { TCreateDesignSchema, TCreateOrUpdateDesignSchema, TUpdateDesignSchema } from "../../schema/design"


class DesignService {

  constructor() {}

  public static createDesign = async (userId:string, data:(TCreateDesignSchema | TCreateOrUpdateDesignSchema)) => {
    const design = await prisma.design.create({
      data: {
        ...data,
        userId,
      }
    })

    return design
  }

  public static getDesignsByUserId = async (userId:string) => {
    const designs = await prisma.design.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return designs
  }

  public static getDesignById = async (designId:string) => {
    const design = await prisma.design.findUnique({
      where: {
        id: designId
      },
    })
    return design
  }
  
  public static updateDesign = async (designId: string, data: TCreateOrUpdateDesignSchema) => {
    const design = await prisma.design.update({
      where: {
        id: designId
      },
      data: {
        ...data
      },
    })
    return design
  }

  public static deleteDesign = async (designId:string) => {
    const design = await prisma.design.delete({
      where: {
        id: designId
      },
    })
    return design
  }
}

export default DesignService