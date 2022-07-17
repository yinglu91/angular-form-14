import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseTitleValidator(
  coursesService: CoursesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return coursesService.findAllCourses().pipe(
      map((courses) => {
        const course = courses.find(
          (course) =>
            course.description.toLowerCase() === control.value.toLowerCase()
        );

        if (course) {
          console.log("course exist: ", course);
        }
        return course ? { titileExists: true } : null;
      }),
      catchError((err) => {
        console.log(err);
        return of({ titileExistsUnknow: true });
      })
    );
  };
}
