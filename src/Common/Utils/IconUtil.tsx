import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

function RemoveIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      />
    </SvgIcon>
  );
}

function AddIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      />
    </SvgIcon>
  );
}

export { AddIcon, RemoveIcon };
