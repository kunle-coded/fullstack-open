import { CoursePart } from "./Content";

interface PartsProps {
  courseParts: CoursePart[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartsProps) => {
  return (
    <div>
      {props.courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <i>{part.description}</i>
              </div>
            );

          case "background":
            return (
              <div key={part.name}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <i>{part.description}</i>
                <p>submit to {part.backgroundMaterial}</p>
              </div>
            );
          case "group":
            return (
              <div key={part.name}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            );
          case "special":
            return (
              <div key={part.name}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <i>{part.description}</i>
                <p>required skills: {part.requirements.join(", ")}</p>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Part;
