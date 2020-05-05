import { set } from "lodash/fp";
import React, { Dispatch } from "react";
import { FormFieldValue } from "../Types/FormFieldChildProps";

export type DynamicFormAction = {
  type: "change";
  payload: { name: string; value: FormFieldValue };
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
      return set("values." + payload.name, payload.value, state);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
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
