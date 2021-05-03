import { Client} from 'pg';
import { CourseType } from "../types";
import { dbOptions } from "@libs/database";

export const getCoursesService: () => Promise<Array<CourseType>> = async () => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        const { rows: products } = await client.query('select * from products JOIN stocks ON products.Id = stocks.product_id;');
        return products;
    }catch (error) {
        console.log('DB error', error);
        throw new DatabaseError('DB error');
    } finally {
        client.end();
    }
}