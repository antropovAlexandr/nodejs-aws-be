import { getProductsById } from "../handler";

import responseCourses from '../../__moks__/responseCourses';

describe('getProductsById Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return code 200', () => {
        // @ts-ignore
        return getProductsById(responseCourses[0].id).then(data => {
            expect(data).toMatchObject({ statusCode: 200});
        });
    });

    it('should return code 404', () => {
        // @ts-ignore
        return getProductsById('123').then(data => {
            expect(data).toMatchObject({ statusCode: 404});
        });
    });
});
