import { coursesAdapter } from "../adapter";

// @ts-ignore
import responseEdxCourses from '../../__moks__/responseEdxCourses.json';
// @ts-ignore
import responseCourses from '../../__moks__/responseCourses.json';


describe('GetProductList Adapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct transformed data from coursesAdapter', () => {
        const sut = coursesAdapter(responseEdxCourses);

        expect(sut).toEqual(responseCourses);
    });

});
