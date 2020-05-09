import { concat, get, set, slice } from "lodash/fp";
import React, { Dispatch } from "react";
import { FormChildProps } from "../Components/DynamicForm";
import { FormFieldValue } from "../Types/FormFieldChildProps";
import { parseNumberFromString } from "../Utils/NumberUtil";
import {
  DEFAULT_FEILDSET_MIN_VALUE,
  extractRulesFromFormFieldProps,
  FieldSchemaRules,
  FieldValidationErrors,
  validateFormState,
} from "../Utils/ValidationUtil";

export type DynamicFormAction =
  | {
      type: "change";
      payload: { name: string; value: FormFieldValue };
    }
  | {
      type: "removeFormFieldSetElement";
      payload: { name: string; index: number };
    }
  | {
      type: "clear";
    }
  | {
      type: "addFormFieldSetElement";
      payload: { name: string; index: number };
    }
  | {
      type: "visited";
      payload: { name: string };
    }
  | {
      type: "submit";
    };

export type FormValues = {
  [key: string]: FormFieldValue;
};

export type FormValidationState =
  | {
      isValid: false;
      errors: FieldValidationErrors;
    }
  | {
      isValid: true;
    };

export type State = {
  values: FormValues;
  rules: FieldSchemaRules;
  showError: boolean;
  validationState: FormValidationState;
  visited: { [key: string]: boolean };
  formFieldSetLength: { [key: string]: { occurance: number | undefined } | [] };
};

type DynamicFormProviderProps = {
  children: React.ReactNode;
  initialValues?: FormValues;
  formSchema: FormChildProps[];
  showError: boolean;
};

const DynamicFormStateContext = React.createContext<State | undefined>(
  undefined
);
const DynamicFormDispatchContext = React.createContext<
  Dispatch<DynamicFormAction> | undefined
>(undefined);
function dynamicFormReducer(state: State, action: DynamicFormAction) {
  let newState = state;
  switch (action.type) {
    case "change": {
      const payload = action.payload;
      newState = set("values." + payload.name, payload.value, state);
      console.log("setting new state", newState);
      break;
    }
    case "submit": {
      newState = {
        ...state,
        showError: true,
      };
      break;
    }
    case "removeFormFieldSetElement": {
      const payload = action.payload;
      const arrayData = get(payload.name, state.values);
      if (
        arrayData &&
        Array.isArray(arrayData) &&
        payload.index < arrayData.length
      ) {
        const firstSet = slice(0, payload.index, arrayData);
        console.log("array data after slice", arrayData);
        const secondSet = slice(payload.index + 1, arrayData.length, arrayData);

        newState = set(
          "values." + payload.name,
          concat(firstSet, secondSet),
          state
        );

        let value = get(`formFieldSetLength.${payload.name}.occurance`, state);

        newState = set(
          `formFieldSetLength.${payload.name}.occurance`,
          value - 1,
          newState
        );
        console.log("setting new state", newState);
      }
      break;
    }
    case "addFormFieldSetElement": {
      debugger;
      const payload = action.payload;
      newState = set(`values.${payload.name}[${payload.index}]`, null, state);

      let value = get(`formFieldSetLength.${payload.name}.occurance`, state);

      newState = set(
        `formFieldSetLength.${payload.name}.occurance`,
        value + 1,
        newState
      );
      break;
    }
    case "clear": {
      newState = {
        ...state,
        values: {},
        visited: {},
      };
      break;
    }
    case "visited": {
      newState = {
        ...state,
        visited: {
          ...state.visited,
          [action.payload.name]: true,
        },
      };
      break;
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
  return validate(newState);
}

function validate(state: State) {
  return set(
    "validationState",
    validateFormState(state.values, state.rules),
    state
  );
}

function buildFormFieldSetLength(rules: FieldSchemaRules) {
  let result = {};
  for (const key in rules) {
    if (rules.hasOwnProperty(key)) {
      const element = rules[key];
      if (element?.type === "FieldSet") {
        const value =
          parseNumberFromString(element?.rules?.min?.value) ??
          DEFAULT_FEILDSET_MIN_VALUE;
        if (element.children) {
          for (let i = 0; i < value; i++) {
            const childResult = buildFormFieldSetLength(element.children);
            if (childResult !== null) {
              result = set(`${key}[${i}]`, childResult, result);
            }
          }

          result = set(`${key}` + ".occurance", value, result);
        }
      }
    }
  }

  return Object.keys(result).length === 0 ? null : result;
}
function init(param: Omit<DynamicFormProviderProps, "children">): State {
  const rules = extractRulesFromFormFieldProps(param.formSchema);
  const state = param.initialValues ?? {};

  return {
    values: state,
    rules: rules,
    validationState: validateFormState(state, rules),
    showError: param.showError,
    visited: {},
    formFieldSetLength: buildFormFieldSetLength(rules) ?? {},
  };
}
function DynamicFormProvider({
  children,
  ...others
}: DynamicFormProviderProps) {
  const [state, dispatch] = React.useReducer(dynamicFormReducer, others, init);

  return (
    <DynamicFormStateContext.Provider value={state}>
      <DynamicFormDispatchContext.Provider value={dispatch}>
        {children}
      </DynamicFormDispatchContext.Provider>
    </DynamicFormStateContext.Provider>
  );
}
function useDynamicForm(): [State, Dispatch<DynamicFormAction>] {
  const state = React.useContext(DynamicFormStateContext);
  const dispatch = React.useContext(DynamicFormDispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useDynamicForm must be used within a DynamicFormProvider");
  }
  return [state, dispatch];
}

export { DynamicFormProvider, useDynamicForm };
