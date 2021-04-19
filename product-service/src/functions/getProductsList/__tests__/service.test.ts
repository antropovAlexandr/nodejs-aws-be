import { getCoursesService } from "../service";

import responseCourses from '../../__moks__/responseCourses';
jest.mock('pg', () => {
    // const rows =  [...responseCourses];
    const mClient = {
        connect: jest.fn(),
        query: () => ({
            rows: []
        }),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});

describe('GetProductList Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct data from getCourses', () => {
        return getCoursesService().then(data => {
            expect(data).toEqual(responseCourses);
        });
    });

});
