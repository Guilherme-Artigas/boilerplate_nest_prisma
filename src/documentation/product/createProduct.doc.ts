import { HttpStatus } from '@nestjs/common';

export const createProductDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Product created successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": HttpStatus.OK,
                        "data": {
                            "name": "Hammer",
                            "companyId": "c8fa805a-acec-4555-bda2-acb70e4ecda0",
                            "company": {
                                "id": "c8fa805a-acec-4555-bda2-acb70e4ecda0",
                                "name": "Another Company",
                                "createdAt": "2025-05-20T21:45:47.000Z",
                                "deletedAt": null
                            },
                            "id": "6c475fca-a382-46e3-9a5b-efb68a2d27f8",
                            "createdAt": "2025-05-20T21:46:05.000Z",
                            "deletedAt": null
                        }
                    }
                },
            },
        },
        NOT_FOUND: {
            status: HttpStatus.NOT_FOUND,
            description: 'Company not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: "Company not found"
                    }
                },
            },
        },
    },
    Operation: {
        summary: 'Create a new product',
        description: 'Creates a new product and returns its basic information such as ID, name and creation date.',
    },
}
