import { Button, Grid } from "@material-ui/core";
import * as React from "react";
import { FormElement } from "./DynamicForm";
import { FormFieldProps } from "./FormField";

export type FormFieldSetProps = {
  children: FormElement;
  minOccurance: number;
  occurances?: number;
  maxOccurance?: number;
  avoidPadLeft?: boolean;
  name: string;
  type: "FieldSet";
};

function cloneElement(name: string, index: number) {
  return (child: any) =>
    React.cloneElement(child, {
      name: name + "[" + index + "]." + child.props.name,
    });
}

function FormFieldSet(props: FormFieldSetProps) {
  const elements: FormElement[] = [];
  React.Children.toArray(props.children).forEach((child) => {
    if (
      React.isValidElement<FormFieldProps>(child) ||
      React.isValidElement<FormFieldSetProps>(child)
    ) {
      elements.push(child);
    }
  });

  const [index, setIndex] = React.useState(() =>
    Math.min(props.minOccurance, props.occurances ?? 1)
  );
  const content: any[] = [];
  console.log(index);
  for (let i = 0; i < index; i++) {
    content.push([elements.map(cloneElement(props.name, i))]);
  }
  const style = !props.avoidPadLeft ? { paddingLeft: "30px" } : undefined;
  return (
    <React.Fragment>
      <Grid container item spacing={1} style={style}>
        {content}
        <Grid item xs={12} sm={9}>
          <Button onClick={() => setIndex(index + 1)}>Add</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

FormFieldSet.defaultProps = {
  type: "FieldSet",
  minOccurance: 1,
};

export default FormFieldSet;
