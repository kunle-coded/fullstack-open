import Part from "./Part";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseExtended {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}
interface CoursePartSpecial extends CoursePartBaseExtended {
  requirements: string[];
  kind: "special";
}

interface CoursePartBackground extends CoursePartBaseExtended {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface CourseProps {
  courses: CoursePart[];
}

const Content = (props: CourseProps) => {
  return (
    <div>
      <Part courseParts={props.courses} />
    </div>
  );
};

export default Content;
