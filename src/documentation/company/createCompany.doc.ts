import { HttpStatus } from '@nestjs/common';

export const createCompanyDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Company created successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": 200,
                        "data": {
                            "name": "Any Company",
                            "manager": {
                                "id": "165c9180-8b07-4e3d-bc2a-1f368cb0b9c0",
                                "name": "Any Manager",
                                "email": "any_email@mail.com",
                                "phone": "31998765432",
                                "cpf": "12345678909",
                                "createdAt": "2025-05-20T21:28:42.000Z",
                                "deletedAt": null
                            },
                            "id": "222c5655-10e9-434b-a9d8-ecc256389925",
                            "createdAt": "2025-05-20T21:30:14.000Z",
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
                        message: "Manager not found"
                    }
                },
            },
        },
        BAD_REQUEST: {
            status: HttpStatus.BAD_REQUEST,
            description: 'This company already exists',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: "This company already exists"
                    }
                },
            },
        }
    },
    Operation: {
        summary: 'Create a new company',
        description: 'Creates a new company and returns its basic information such as ID, name, and creation date.',
    },
}
