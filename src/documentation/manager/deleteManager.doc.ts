import { HttpStatus } from '@nestjs/common';

export const deleteManagerDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Manager deleted successfully',
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
    },
    Operation: {
        summary: 'Delete a manager',
        description: 'Deletes a manager by its ID and returns the deleted manager ID as confirmation.',
    },
}
