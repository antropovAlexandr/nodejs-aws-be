import { getCourseById } from "../service";
// @ts-ignore
import responseCourses from '../../__moks__/responseCourses.json';


describe('getProductsById Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct data from getCourseById', () => {
        return getCourseById(responseCourses[0].id).then(data => {
            expect(data).toEqual(responseCourses[0]);
        });
    });

});
