import { z } from "zod"

export const vendorSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  fullName: z.string(),
  email: z.string(),
  address: z.string(),
  country: z.string(),
  date: z.date(),
  status: z.string()
})

export type Vendor = z.infer<typeof vendorSchema>