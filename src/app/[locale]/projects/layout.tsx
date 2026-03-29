import type { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  dialog: ReactNode;
}

export default function ProjectsLayout(props: Props) {
  const { children, dialog } = props;

  return (
    <>
      {children}
      {dialog}
    </>
  );
}
