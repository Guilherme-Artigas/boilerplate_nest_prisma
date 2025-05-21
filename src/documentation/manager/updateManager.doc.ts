import { HttpStatus } from '@nestjs/common';

export const updateManagerDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Manager updated successfully',
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
            status: HttpStatus.OK,
            description: 'Manager not found',
            content: {
                'application/json': {
                    example: {
                        "statusCode": 404,
                        "message": "Manager not found"
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
                        CpfInUse: {
                            summary: 'Cpf in use',
                            value: {
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: 'Cpf in Use',
                            },
                        },
                    },
                },
            }
        }
    },
    Operation: {
        summary: 'Updated a Manager',
        description: 'Update manager and returns its basic information such as ID, email, name, phone, cpf and creation date.',
    },
}
