import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { FieldMapping } from "../Utils/FormUtil";
import FormField from "./FormField";

export type FieldSetProps = {
  children: (FormFieldChildProps | FieldSetProps)[];
  type: "FieldSet";
};

function FieldSet(props: FieldSetProps) {
  return (
    <React.Fragment>
      {props.children.map((child) => {
        if (child.type !== "FieldSet") {
          const component = FieldMapping[child.type];
          return (
            <FormField
              component={component}
              name="date"
              displayName="Hello World"
              onBlur={() => console.log("blur")}
              onValueChange={(val: unknown) => console.log(val)}
              type={child.type}
            />
          );
        } else {
          return <FieldSet children={child.children} type={child.type} />;
        }
      })}
    </React.Fragment>
  );
}

export default FieldSet;
