import { Client} from 'pg';
import {CourseRequestType} from "../types";
import { dbOptions } from "@libs/database";

export const addProductService = async ({title, description, price, count}: CourseRequestType) =>  {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        await client.query('BEGIN')

        const productStock = 'insert into products (title, description, price) values($1, $2, $3) RETURNING id';
        const products = await client.query(productStock, [title, description, price]);

        const queryStock = 'insert into stocks (product_id, count) values($1, $2) RETURNING id';
        const stocks = await client.query(queryStock, [products.rows[0].id, count]);

        await client.query('COMMIT')

        return {
            id: products.rows[0].id,
            title,
            description,
            price,
            product_id: stocks.rows[0].id,
            count
        }

    }catch (error) {
        console.log('DB error', error);
        await client.query('ROLLBACK')
        throw new DatabaseError('DB error');
    } finally {
        client.end();
    }
}