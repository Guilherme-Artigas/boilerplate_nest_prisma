import { HttpStatus } from '@nestjs/common';

export const getManagerByIdDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Manager retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": 200,
                        "data": {
                            "id": "f3d108f3-d322-47e5-9e67-7e5cae688252",
                            "name": "Any Name",
                            "email": "any_email@mail.com",
                            "phone": "31991234567",
                            "cpf": "12345678909",
                            "createdAt": "2025-05-20T20:44:26.000Z",
                            "deletedAt": null
                        }
                    }
                },
            },
        },
        NOT_FOUND: {
            status: HttpStatus.NOT_FOUND,
            description: 'Manager not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Manager not found',
                    },
                },
            },
        },
    },
    Operation: {
        summary: 'Get manager by ID',
        description: 'Retrieves a manager by its ID and returns its basic information such as ID, email, name, phone, cpf and creation date.',
    },
};
