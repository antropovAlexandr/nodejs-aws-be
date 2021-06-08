export const generatePolicy = (
    principalId: string,
    Resource: string,
    Effect: 'Deny' | 'Allow',
) => ({
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect,
                    Resource,
                },
            ],
        },
    }
);