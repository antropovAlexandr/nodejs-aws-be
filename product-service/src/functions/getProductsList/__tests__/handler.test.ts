import { getProductsList } from "../handler";


describe('GetProductList Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return code 200', () => {
        return getProductsList().then(data => {
            expect(data).toMatchObject({ statusCode: 200});
        });
    });
});
