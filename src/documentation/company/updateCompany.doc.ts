import { HttpStatus } from '@nestjs/common';

export const updateCompanyDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Company updated successfully',
            content: {
                'application/json': {
                    example: {
                        "statusCode": 200,
                        "data": {
                            "id": "17e6859d-d8f0-4898-ae63-4bacf0c59627",
                            "name": "Any Company",
                            "createdAt": "2025-05-20T21:29:35.000Z",
                            "deletedAt": null
                        }
                    }
                },
            },
        },
        NOT_FOUND: {
            status: HttpStatus.NOT_FOUND,
            description: 'Not Found Issues',
            content: {
                'application/json': {
                    examples: {
                        ManagerNotFound: {
                            summary: 'Manager Not Found',
                            value: {
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: 'Manager not found',
                            },
                        },
                        CompanyNotFound: {
                            summary: 'Company not found',
                            value: {
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: 'Company not found',
                            },
                        }
                    },
                },
            },
        },
    },
    Operation: {
        summary: 'Update a company',
        description:
            'Updates the information of a company by its ID and returns the updated ID.',
    },
};
