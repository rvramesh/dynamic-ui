import { Grid } from "@material-ui/core";
import { get } from "lodash/fp";
import * as React from "react";
import { FunctionComponent, ReactNode, useState } from "react";
import { useDynamicForm } from "../Context/DynamicFormContext";
import { FormChildProps, FormElement } from "./DynamicForm";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import FormFieldItemAddButton from "./FormFieldItemAddButton";
import FormFieldItemRemove from "./FormFieldItemRemoveButton";

type FormFieldSetBaseProps = {
  min?: number;
  occurances?: number;
  max?: number;
  avoidPadLeft?: boolean;
  name: string;
  type: "FieldSet";
};
type FormFieldSetWithChildProps = {
  childProps: FormChildProps[];
} & FormFieldSetBaseProps;

type FormFieldWithChildElementProps = {
  children: FormElement[] | FormElement;
} & FormFieldSetBaseProps;

export type FormFieldSetProps =
  | FormFieldSetWithChildProps
  | FormFieldWithChildElementProps;

function cloneElement(name: string, index: number) {
  return (child: FormElement) =>
    React.cloneElement<FormChildProps>(child, {
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

const FormFieldSet: FunctionComponent<FormFieldSetProps> = (props) => {
  //Default props will be used when calling from jsx only
  //will be missing if specified in json schema
  //initialize with defaultProps.min
  const minChildren = props.min ?? 1;

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

  const [state, dispatch] = useDynamicForm();

  const [index, setIndex] = React.useState(() => {
    const fieldValue = get(props.name, state.values);
    const fieltValueArrayLength = Array.isArray(fieldValue)
      ? fieldValue.length
      : undefined;
    return Math.max(
      minChildren,
      fieltValueArrayLength ?? props.occurances ?? minChildren
    );
  });

  const removeIndex = (name: string, index: number) => {
    dispatch({
      type: "removeFormFieldSetElement",
      payload: {
        name: name,
        index: index,
      },
    });
  };
  const content: ReactNode[] = [];
  console.log(index);
  for (let i = 0; i < index; i++) {
    content.push([elements.map(cloneElement(props.name, i))]);
    if (index > minChildren) {
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
        {(!props.max || index < props.max) && (
          <Grid item xs={12} sm={9}>
            <FormFieldItemAddButton addClicked={() => setIndex(index + 1)} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

FormFieldSet.defaultProps = {
  type: "FieldSet",
};

export default FormFieldSet;
