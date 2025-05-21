import { HttpStatus } from '@nestjs/common';

export const createManagerDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Manager created successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": HttpStatus.OK,
                        "data": {
                            "email": "any_email@mail.com",
                            "name": "Any Name",
                            "phone": "319912345678",
                            "cpf": "12345678909",
                            "id": "f3d108f3-d322-47e5-9e67-7e5cae688252",
                            "createdAt": "2025-05-20T20:44:26.000Z",
                            "deletedAt": null
                        }
                    }
                },
            },
        },
        BAD_REQUEST: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Bad Request Issues',
            content: {
                'application/json': {
                    examples: {
                        InvalidCpf: {
                            summary: 'Invalid CPF',
                            value: {
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: 'Invalid cpf',
                            },
                        },
                        InvalidPhone: {
                            summary: 'Invalid Phone number',
                            value: {
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: 'Invalid phone number',
                            },
                        },
                        ManagerExists: {
                            summary: 'Manager already exists',
                            value: {
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: 'Manager already exists',
                            },
                        },
                    },
                },
            }
        }
    },
    Operation: {
        summary: 'Create a new manager',
        description: 'Creates a new manager and returns its basic information such as ID, email, name, phone, cpf and creation date.',
    },
}
