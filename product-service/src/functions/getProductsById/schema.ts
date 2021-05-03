export default {
    type: "object",
    properties: {
        productId: {
            type : "string",
            format : "uuid",
            pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
        }
    },
    required: ['productId']
} as const;