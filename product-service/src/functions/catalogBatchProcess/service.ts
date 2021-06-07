import {addProductService} from "@functions/addProduct/service";


export const saveProducts: (products) => Promise<void> = async (products) => {
    products.forEach(({ title, description, price, count }) => {
        addProductService({ title, description, price, count });
    });
}