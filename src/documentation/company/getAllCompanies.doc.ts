import { HttpStatus } from '@nestjs/common';

export const getAllCompaniesDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'List of companies retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": 200,
                        "data": {
                            "items": [
                                {
                                    "id": "17e6859d-d8f0-4898-ae63-4bacf0c59627",
                                    "name": "Company A",
                                    "createdAt": "2025-05-20T21:29:35.000Z",
                                    "deletedAt": null
                                },
                                {
                                    "id": "222c5655-10e9-434b-a9d8-ecc256389925",
                                    "name": "Company B",
                                    "createdAt": "2025-05-20T21:30:14.000Z",
                                    "deletedAt": null
                                }
                            ],
                            "meta": {
                                "totalItems": 2,
                                "itemCount": 2,
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
        summary: 'Get all companies',
        description: 'Retrieves a paginated list of all registered companies, including ID, name, creation date, and deletion status.',
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
