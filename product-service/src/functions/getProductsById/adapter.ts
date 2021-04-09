import {EdxCourseType, CourseType} from "@functions/types";

export const courseAdapter = ({ name, id, start, end, media, short_description }: EdxCourseType): CourseType => ({
        id,
        title: name,
        description: short_description || '',
        start,
        end,
        image: media?.image?.small,
        price: 0
});