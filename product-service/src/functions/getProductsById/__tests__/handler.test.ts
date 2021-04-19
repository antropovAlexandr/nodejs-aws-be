import { getProductsById } from "../handler";
// @ts-ignore
import responseCourses from '../../__moks__/responseCourses.json';

describe('getProductsById Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return code 200', () => {
        return getProductsById(responseCourses[0].id).then(data => {
            expect(data).toMatchObject({ statusCode: 200});
        });
    });

    it('should return code 404', () => {
        return getProductsById('123').then(data => {
            expect(data).toMatchObject({ statusCode: 404});
        });
    });
});
