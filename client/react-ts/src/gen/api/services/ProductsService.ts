/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCIVO } from '../models/ProductCIVO';
import type { ProductCOVO } from '../models/ProductCOVO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Search products by name and price
     * @param name The name of the product
     * @param price The price of the product
     * @returns ProductCOVO
     * @throws ApiError
     */
    public static searchProductByNameAndPrice(
        name?: string,
        price?: number,
    ): CancelablePromise<Array<ProductCOVO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/search',
            query: {
                'name': name,
                'price': price,
            },
        });
    }
    /**
     * Get a product by id
     * @param id The id of the product
     * @returns ProductCOVO
     * @throws ApiError
     */
    public static getProduct(
        id: number,
    ): CancelablePromise<ProductCOVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a product
     * @param id The id of the product
     * @param requestBody
     * @returns ProductCOVO
     * @throws ApiError
     */
    public static updateProduct(
        id: number,
        requestBody: ProductCIVO,
    ): CancelablePromise<ProductCOVO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a product
     * @param id The id of the product
     * @returns any
     * @throws ApiError
     */
    public static deleteProduct(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all products
     * @returns ProductCOVO
     * @throws ApiError
     */
    public static getAllProducts(): CancelablePromise<Array<ProductCOVO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
        });
    }
    /**
     * Create a new product
     * @param requestBody
     * @returns ProductCOVO
     * @throws ApiError
     */
    public static createProduct(
        requestBody: ProductCIVO,
    ): CancelablePromise<ProductCOVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
