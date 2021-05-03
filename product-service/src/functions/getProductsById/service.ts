import { Client} from 'pg';
import { CourseType } from "@functions/types";
import { dbOptions } from "@libs/database";


export const getCourseById: (id) => Promise<CourseType | undefined> = async (id: string) => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        const { rows: product } = await client.query('select * from products JOIN stocks ON products.Id = stocks.product_id where products.id=$1 LIMIT 1', [id]);
        return product;
    }catch (error) {
        console.log('DB error', error);
        throw new DatabaseError('DB error');
    } finally {
        client.end();
    }
}