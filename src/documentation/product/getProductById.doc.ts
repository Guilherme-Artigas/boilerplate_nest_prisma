import { HttpStatus } from '@nestjs/common';

export const getProductByIdDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Product retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": HttpStatus.OK,
                        "data": {
                            "id": "6c475fca-a382-46e3-9a5b-efb68a2d27f8",
                            "name": "Hammer",
                            "createdAt": "2025-05-20T21:46:05.000Z",
                            "deletedAt": null
                        }
                    }
                },
            },
        },
        NOT_FOUND: {
            status: HttpStatus.NOT_FOUND,
            description: 'Product not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Product not found',
                    },
                },
            },
        },
    },
    Operation: {
        summary: 'Get product by ID',
        description: 'Retrieves a product by its ID and returns its basic information such as ID, name and creation date.',
    },
};
