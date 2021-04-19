import { courseAdapter } from "../adapter";

// @ts-ignore
import responseEdxCourses from '../../__moks__/responseEdxCourses.json';
// @ts-ignore
import responseCourses from '../../__moks__/responseCourses.json';


describe('getProductsById Adapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct transformed data from courseAdapter', () => {
        const sut = courseAdapter(responseEdxCourses.data.results[0]);

        expect(sut).toEqual(responseCourses[0]);
    });

});
