import { courseAdapter } from "./adapter";
import { EdxCourseType, CourseType } from "@functions/types";
// @ts-ignore
import responseEdxCourses from "../__moks__/responseEdxCourses.json";


export const getCourseById: (id) => Promise<CourseType | undefined> = async (id: string) => {
    const course: EdxCourseType | undefined = await new Promise(resolve =>
        setTimeout(() => resolve(responseEdxCourses.data.results.find(course => course.id === id)), 1000)
    );
    return course ? courseAdapter(course) : undefined;
}