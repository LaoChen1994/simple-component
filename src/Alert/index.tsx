import type { PropsWithChildren } from "react";

export interface AlertProps {
  type?: "info" | "positive" | "negative" | "warning";
}

export type KindMap = Record<Required<AlertProps>["type"], string>;

const prefixCls = "happy-alert";

const kinds: KindMap = {
  info: "#5352ED",
  positive: "#2ED573",
  negative: "#FF4757",
  warning: "#FFA502"
};

const Alert = (props: PropsWithChildren<AlertProps>) => {
  const { type = "info", children, ...rest } = props;

  return (
    <div
      className={prefixCls}
      style={{
        background: kinds[type]
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Alert;
