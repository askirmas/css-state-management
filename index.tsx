import type { DetailedHTMLProps, LabelHTMLAttributes, PropsWithChildren } from "react"

import {iding, subscribe, modelProps, viewerProps} from "./utils"

type tLabelProps = Omit<DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "htmlFor">

type tEntry = {
  "property": string|number
  "value": string|number
}

type tControllerProps = PropsWithChildren<tLabelProps & Partial<
  tEntry
  & {
    "subscribe": string
  }
>>

export type {
  tControllerProps
}

export {
  Controller,
  modelProps, viewerProps, subscribe
}

function Controller({children, property, value, "subscribe": s, ...props}: tControllerProps) {
  return <label {...{
    ...props,
    ...subscribe(s),
    "htmlFor": iding(property, value)
  }}>{children}</label>
}
