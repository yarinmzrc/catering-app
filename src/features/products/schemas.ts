import { z } from "zod"

const createProductImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(1),
  imagePath: createProductImageSchema,
  categoryId: z.string(),
})

const updateProductImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .optional()

export const updateProductSchema = createProductSchema
  .omit({ imagePath: true })
  .extend({
    imagePath: updateProductImageSchema,
  })
