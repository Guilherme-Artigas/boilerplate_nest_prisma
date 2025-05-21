import { HttpStatus } from '@nestjs/common';

export const getAllProductsDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'List of products retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": HttpStatus.OK,
                        "data": {
                            "items": [
                                {
                                    "id": "6c475fca-a382-46e3-9a5b-efb68a2d27f8",
                                    "name": "Hammer",
                                    "createdAt": "2025-05-20T21:46:05.000Z",
                                    "deletedAt": null
                                }
                            ],
                            "meta": {
                                "totalItems": 1,
                                "itemCount": 1,
                                "itemsPerPage": 10,
                                "totalPages": 1,
                                "currentPage": 1
                            }
                        }
                    }
                },
            },
        },
    },
    Operation: {
        summary: 'Get all products',
        description: 'Retrieves a paginated list of all registered products, including as ID, name and creation date.',
    },
    ApiQuery: {
        page: {
            name: 'page',
            required: false,
            description: 'Page number for pagination.',
            example: '1',
            type: String,
        },
        limit: {
            name: 'limit',
            required: false,
            description: 'Number of items per page.',
            example: '10',
            type: String,
        },
    }
}
