import { courseAdapter } from "../getProductsById/adapter";
import { CourseType, EdxCoursesResponseType } from "../types";

export const coursesAdapter = ({ data }: EdxCoursesResponseType): Array<CourseType> =>
    data.results.map((course) => (
        courseAdapter(course)
    ))