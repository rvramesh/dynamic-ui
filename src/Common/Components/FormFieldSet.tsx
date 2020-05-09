import { Grid } from "@material-ui/core";
import { get } from "lodash/fp";
import * as React from "react";
import { FunctionComponent, ReactNode, useState } from "react";
import { State, useDynamicForm } from "../Context/DynamicFormContext";
import { ValidationRules } from "../Types/FormFieldChildProps";
import { parseNumberFromString } from "../Utils/NumberUtil";
import { DEFAULT_FEILDSET_MIN_VALUE } from "../Utils/ValidationUtil";
import { FormChildProps, FormElement } from "./DynamicForm";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import FormFieldItemAddButton from "./FormFieldItemAddButton";
import FormFieldItemRemove from "./FormFieldItemRemoveButton";

type FormFieldSetBaseProps = {
  avoidPadLeft?: boolean;
  name: string;
  rules?: ValidationRules;
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

export function isFormFieldWithChildProps(
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
  const minChildren =
    parseNumberFromString(props.rules?.min?.value) ??
    DEFAULT_FEILDSET_MIN_VALUE;
  const maxChildren = parseNumberFromString(props.rules?.max?.value);
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

  const index = getOccurance(props, state) ?? DEFAULT_FEILDSET_MIN_VALUE;

  const removeIndex = (name: string, index: number) => {
    dispatch({
      type: "removeFormFieldSetElement",
      payload: {
        name: name,
        index: index,
      },
    });
  };
  const addIndex = (name: string, index: number) => {
    dispatch({
      type: "addFormFieldSetElement",
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
        {(!maxChildren || index < maxChildren) && (
          <Grid item xs={12}>
            <FormFieldItemAddButton
              addClicked={() => {
                addIndex(props.name, index + 1);
              }}
            />
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

function getOccurance(
  props: React.PropsWithChildren<FormFieldSetProps>,
  state: State
) {
  const content = get(props.name, state.formFieldSetLength);
  return Array.isArray(content) ? content.length : content.occurance;
}
