import { HttpStatus } from '@nestjs/common';

export const deleteProductDocItems = {
    ApiResponse: {
        OK: {
            status: HttpStatus.OK,
            description: 'Product deleted successfully',
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
            description: 'Product not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: "Product not found"
                    }
                },
            },
        },
    },
    Operation: {
        summary: 'Delete a product',
        description: 'Deletes a product by its ID and returns the deleted product ID as confirmation.',
    },
}
