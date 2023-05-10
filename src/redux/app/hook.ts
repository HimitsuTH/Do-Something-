import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AddDispatch } from "./store";

export const useAppSeletor: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AddDispatch>();
