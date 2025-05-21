import { HttpStatus } from '@nestjs/common';

export const getCompanyByIdDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Company retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.OK,
                        data: {
                            id: 'c601f3ca-f3a4-4a47-aef7-4f155c283ad7',
                            name: 'Another Company',
                            createdAt: '2025-05-20T18:01:56.000Z',
                            deletedAt: null,
                        },
                    },
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
                        message: 'Company not found',
                    },
                },
            },
        },
    },
    Operation: {
        summary: 'Get company by ID',
        description: 'Retrieves a company by its ID and returns its basic information such as ID, name, creation date, and deletion status.',
    },
};
