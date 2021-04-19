import {APIGatewayProxyEvent} from "aws-lambda";

export type HttpEventRequest<T = null> = Omit<APIGatewayProxyEvent, 'pathParameters'> & {
    pathParameters: T
}

export type EdxCourseType = {
    name: string;
    id: string;
    start: string;
    end: string;
    short_description: string;
    media: {
        image: {
            small: string;
        }
    }
}
export type EdxCoursesResponseType = {
    data: {
        results: Array<EdxCourseType>
    }
};

export type CourseType = {
    id: string;
    title: string;
    description: string;
    price: number;
    count: number;
    product_id: string;
}

export type CourseRequestType = {
    title: string;
    description: string;
    price: number;
    count: number;
}