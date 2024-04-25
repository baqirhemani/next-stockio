import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const addVendorSchema = z.object({
    vendorName: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(3).trim(),
    vendorEmailAddress: z.string().email().optional(),
    vendorPhone: z.string().min(10),
    ownershipType: z.enum(["individual", "company"]),
    companyName: z.string().trim(),
    tradeLicenseNumber: z.string().trim(),
    companyContactDetails: z.array(
      z.object({
        contactName: z.string().trim(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().min(10),
      })
    ),
    vendorType: z.enum(["farmer", "exporter", "importer", "distributor", "supermarket", "grocery", "horeca"]),
    nationalIDNumber: z.string().trim(),
    tradeLicense: z.string(),
    nationalIDFront: z.string(),
    nationalIDBack: z.string(),
    vendorStatus: z.enum(["active", "inactive", "on hold", "close"]),
    corporateTaxStatus: z.enum(['registered', 'unregistered']),
    corporateTaxNumber: z.string(),
    corporateTaxCertificate: z.string(),
    vatRegistrationStatus: z.enum(['registered', 'unregistered']),
    vatNumber: z.string(),
    vatCertificate: z.string(),
    vendorProductBrand: z.array(
      z.object({
        vendorBrand: z.string()
      })
    ),
    country: z.string(),
    address: z.string().min(10).max(255)
  })
    .refine(
      (data) => {
        if (data.ownershipType === "company") {
          return !!data.companyName;
        }
        return true;
      },
      {
        message: "Company name is required",
        path: ["companyName"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "company") {
          return !!data.tradeLicenseNumber;
        }
        return true;
      },
      {
        message: "Trade License is required",
        path: ["tradeLicenseNumber"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "company") {
          return !!data.tradeLicense;
        }
        return true;
      },
      {
        message: "Trade License is required",
        path: ["tradeLicense"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "company") {
          return !!data.corporateTaxStatus;
        }
        return true;
      },
      {
        message: "Corporate Tax Status is required",
        path: ["corporateTaxStatus"],
      }
    )
    .refine(
      (data) => {
        if (data.corporateTaxStatus === "registered") {
          return !!data.corporateTaxNumber;
        }
        return true;
      },
      {
        message: "Corporate Tax Number is required",
        path: ["corporateTaxNumber"],
      }
    )
    .refine(
      (data) => {
        if (data.corporateTaxStatus === "registered") {
          return !!data.corporateTaxCertificate;
        }
        return true;
      },
      {
        message: "Tax Certificate is required",
        path: ["taxCertificate"],
      }
    )
    .refine(
      (data) => {
       if (data.ownershipType === "individual") {
        return !!data.vendorEmailAddress;
       } 
       return true;
      }
    )
    .refine(
      (data) => {
       if (data.ownershipType === "individual") {
        return !!data.vendorPhone;
       } 
       return true;
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "company") {
          return !!data.vatRegistrationStatus;
        }
        return true;
      },
      {
        message: "VAT Registration Status is required",
        path: ["vatRegistrationStatus"],
      }
    )
    .refine(
      (data) => {
        if (data.vatRegistrationStatus === "registered") {
          return !!data.vatNumber;
        }
        return true;
      },
      {
        message: "VAT Number is required",
        path: ["vatNumber"],
      }
    )
    .refine(
      (data) => {
        if (data.vatRegistrationStatus === "registered") {
          return !!data.vatCertificate;
        }
        return true;
      },
      {
        message: "VAT Certificate is required",
        path: ["vatCertificate"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "individual") {
          return !!data.vendorName;
        }
        return true;
      },
      {
        message: "Vendor name is required",
        path: ["name"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "individual") {
          return !!data.nationalIDNumber;
        }
        return true;
      },
      {
        message: "National ID is required",
        path: ["nationalIDNumber"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "individual") {
          return !!data.nationalIDFront;
        }
        return true;
      },
      {
        message: "National ID is required",
        path: ["nationalIDFront"],
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "individual") {
          return !!data.nationalIDBack;
        }
        return true;
      },
      {
        message: "National ID is required",
        path: ["nationalIDBack"],
      }
    )
    .refine(
      (data) => {
        return !!isValidPhoneNumber
      },
      {
        message: "Invalid Phone Number"
      }
    )
    .refine(
      (data) => {
        if (data.ownershipType === "company") {
          return !!data.companyContactDetails;
        }
        return true
      }
    )