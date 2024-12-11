/* eslint-disable react-refresh/only-export-components */

import { createContext, useMemo, useState } from "react";

export type DaoHooksConfig = {
  graphKey: string;
};
export type DaoHooksProviderProps = {
  keyConfig: DaoHooksConfig;
};

interface IDaoContext {
  config: DaoHooksConfig;
  setConfig: React.Dispatch<React.SetStateAction<IDaoContext["config"]>>;
}

export const DaoHooksContext = createContext<IDaoContext | null>(null);

export const DaoHooksProvider = (
  parameters: React.PropsWithChildren<DaoHooksProviderProps>
) => {
  const { children, keyConfig } = parameters;

  const [config, setConfig] = useState<DaoHooksConfig>(keyConfig);

  const value = useMemo(() => ({ config, setConfig }), [config]);

  return (
    <DaoHooksContext.Provider value={value}>
      {children}
    </DaoHooksContext.Provider>
  );
};
