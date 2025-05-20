import { HttpStatus } from '@nestjs/common';

export const getAllManagersDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'List of managers retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": 200,
                        "data": {
                            "items": [
                                {
                                    "id": "f3d108f3-d322-47e5-9e67-7e5cae688252",
                                    "name": "Any Name",
                                    "email": "any_email@mail.com",
                                    "phone": "31991234567",
                                    "cpf": "12345678909",
                                    "createdAt": "2025-05-20T20:44:26.000Z",
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
        summary: 'Get all managers',
        description: 'Retrieves a paginated list of all registered managers, including as ID, email, name, phone, cpf and creation date.',
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
