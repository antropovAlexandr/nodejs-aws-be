import { coursesAdapter } from "./adapter";
import { CourseType, EdxCoursesResponseType } from "../types";
// @ts-ignore
import responseEdxCourses from "../__moks__/responseEdxCourses.json";

export const getCourses: () => Promise<Array<CourseType>> = async () => {
    const courses: EdxCoursesResponseType = await new Promise(resolve =>
        setTimeout(() => resolve(responseEdxCourses), 1000)
    );
    return coursesAdapter(courses);
}