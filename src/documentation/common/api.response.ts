import { HttpStatus } from '@nestjs/common';

export const commonApiResponse = {
    INTERNAL_SERVER_ERROR: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'internal server error',
        content: {
            'application/json': {
                example: {
                    statusCode: 500,
                    message: 'Internal server error',
                },
            },
        },
    }
};
