import { concat, get, set, slice } from "lodash/fp";
import React, { Dispatch } from "react";
import { FormFieldValue } from "../Types/FormFieldChildProps";

export type DynamicFormAction =
  | {
      type: "change";
      payload: { name: string; value: FormFieldValue };
    }
  | {
      type: "removeFormFieldSetElement";
      payload: { name: string; index: number };
    };

type State = {
  values: {
    [key: string]: FormFieldValue;
  };
};
type DynamicFormProviderProps = { children: React.ReactNode };

const DynamicFormStateContext = React.createContext<State | undefined>(
  undefined
);
const DynamicFormDispatchContext = React.createContext<
  Dispatch<DynamicFormAction> | undefined
>(undefined);
function dynamicFormReducer(state: State, action: DynamicFormAction) {
  switch (action.type) {
    case "change": {
      const payload = action.payload;
      const newState = set("values." + payload.name, payload.value, state);
      console.log("setting new state", newState);
      return newState;
    }
    case "removeFormFieldSetElement": {
      debugger;
      const payload = action.payload;
      const arrayData = get("values." + payload.name, state);
      if (arrayData && payload.index < arrayData.length) {
        const firstSet = slice(0, payload.index, arrayData);
        console.log("array data after slice", arrayData);
        const secondSet = slice(payload.index + 1, arrayData.length, arrayData);

        const newState = set(
          "values." + payload.name,
          concat(firstSet, secondSet),
          state
        );
        console.log("setting new state", newState);
        return newState;
      } else {
        return { ...state };
      }
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}
function DynamicFormProvider({ children }: DynamicFormProviderProps) {
  const [state, dispatch] = React.useReducer(dynamicFormReducer, {
    values: {},
  });

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
