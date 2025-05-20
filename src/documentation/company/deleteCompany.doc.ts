import { HttpStatus } from '@nestjs/common';

export const deleteCompanyDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Company deleted successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.OK,
                        data: {
                            id: "06ec9a0e-de52-4af5-9174-89425c5a6ff2",
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
        summary: 'Delete a company',
        description: 'Deletes a company by its ID and returns the deleted company ID as confirmation.',
    },
}
