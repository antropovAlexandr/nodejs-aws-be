import { getCourses } from "../service";
// @ts-ignore
import responseCourses from '../../__moks__/responseCourses.json';


describe('GetProductList Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct data from getCourses', () => {
        return getCourses().then(data => {
            expect(data).toEqual(responseCourses);
        });
    });

});
