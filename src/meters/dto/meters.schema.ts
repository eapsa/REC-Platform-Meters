import * as joi from "joi";

export const entrySchema = joi.object({

  deviceId: joi.string().required(),

  activeImport: joi.number().integer().min(0).required(),

  activeExport: joi.number().integer().min(0).required(),

  reactiveInductive: joi.number().integer().min(0).required(),

  reactiveCapacitive: joi.number().integer().min(0).required(),

  timestamp: joi.string().required()
});

export const querySchema = joi.object({
    
    startInterval: joi.string().optional().default("0"),

    deviceId: joi.string().optional(),

    skip: joi.number().integer().min(0).optional(),

    limit: joi.number().integer().min(0).max(10000).optional(),
})