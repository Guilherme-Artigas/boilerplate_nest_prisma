import { HttpStatus } from '@nestjs/common';

export const updateProductDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Manager updated successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": HttpStatus.OK,
                        "data": {
                            "name": "Any Product",
                            "id": "9703fb56-62b0-4de6-8694-988e57183d66",
                            "createdAt": "2025-05-20T21:49:20.000Z",
                            "deletedAt": null
                        }
                    }
                },
            },
        },
        NOT_FOUND: {
            status: HttpStatus.OK,
            description: 'Not Found Issues',
            content: {
                'application/json': {
                    examples: {
                        CompanyNotFound: {
                            summary: 'Company not found',
                            value: {
                                statusCode: HttpStatus.NOT_FOUND,
                                message: 'Company not found',
                            },
                        },
                        ProductNotFound: {
                            summary: 'Product not found',
                            value: {
                                statusCode: HttpStatus.NOT_FOUND,
                                message: 'Product not found',
                            },
                        },
                    },
                },
            }
        },
    },
    Operation: {
        summary: 'Updated a Product',
        description: 'Update product and returns its basic information such as ID, name, and creation date.',
    },
}
