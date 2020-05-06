import { Grid } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { useDynamicForm } from "../Context/DynamicFormContext";
import { FormElement, FormProps } from "./DynamicForm";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import FormFieldItemAddButton from "./FormFieldItemAddButton";
import FormFieldItemRemove from "./FormFieldItemRemoveButton";

type FormFieldSetBaseProps = {
  minOccurance: number;
  occurances?: number;
  maxOccurance?: number;
  avoidPadLeft?: boolean;
  name: string;
  type: "FieldSet";
};
type FormFieldSetWithChildProps = {
  childProps: FormProps[];
} & FormFieldSetBaseProps;

type FormFieldWithChildElementProps = {
  children: FormElement;
} & FormFieldSetBaseProps;

export type FormFieldSetProps =
  | FormFieldSetWithChildProps
  | FormFieldWithChildElementProps;

function cloneElement(name: string, index: number) {
  return (child: any) =>
    React.cloneElement(child, {
      name: name + "[" + index + "]." + child.props.name,
      key: name + "[" + index + "]." + child.props.name,
    });
}

function isFormFieldWithChildProps(
  value: FormFieldSetProps
): value is FormFieldSetWithChildProps {
  return (
    typeof (value as FormFieldSetWithChildProps).childProps !== "undefined"
  );
}

function FormFieldSet(props: FormFieldSetProps) {
  const [children] = useState(() =>
    isFormFieldWithChildProps(props)
      ? props.childProps.map(fieldFactory)
      : props.children
  );

  const elements: FormElement[] = [];
  React.Children.toArray(children).forEach((child) => {
    if (
      React.isValidElement<FormFieldProps>(child) ||
      React.isValidElement<FormFieldSetProps>(child)
    ) {
      elements.push(child);
    }
  });

  const [index, setIndex] = React.useState(() =>
    Math.min(props.minOccurance, props.occurances ?? props.minOccurance)
  );
  const [state, dispatch] = useDynamicForm();

  const removeIndex = (name: string, index: number) => {
    dispatch({
      type: "removeFormFieldSetElement",
      payload: {
        name: name,
        index: index,
      },
    });
  };
  const content: any[] = [];
  console.log(index);
  for (let i = 0; i < index; i++) {
    content.push([elements.map(cloneElement(props.name, i))]);
    if (index > props.minOccurance) {
      content.push(
        <FormFieldItemRemove
          removeClicked={() => {
            removeIndex(props.name, i);
            setIndex(index - 1);
          }}
          key={props.name + "-" + i}
        />
      );
    }
  }
  const style = !props.avoidPadLeft ? { paddingLeft: "30px" } : undefined;
  return (
    <React.Fragment>
      <Grid container item spacing={1} style={style}>
        {content}
        {(!props.maxOccurance || index < props.maxOccurance) && (
          <Grid item xs={12} sm={9}>
            <FormFieldItemAddButton addClicked={() => setIndex(index + 1)} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

FormFieldSet.defaultProps = {
  type: "FieldSet",
  minOccurance: 1,
};

export default FormFieldSet;
