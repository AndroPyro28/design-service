import prisma from "../../libs/prisma"
import { TCreateDesignSchema, TUpdateDesignSchema } from "../../schema/design"


class DesignService {

  constructor() {}

  public static createDesign = async (userId:string, data:TCreateDesignSchema) => {
    const design = await prisma.design.create({
      data: {
        name: 'asd',
        canvasData: 'asd',
        height:1,
        userId:'asd',
        width:1,
        category:'Logo'
      }
    })
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
  
  public static updateDesign = async (designId: string, data: TUpdateDesignSchema) => {
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