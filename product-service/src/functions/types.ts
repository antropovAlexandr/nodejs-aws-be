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
    title: string;
    id: string;
    description: string,
    start: string;
    end: string;
    image: string;
    price: number;
}