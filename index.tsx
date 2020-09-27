import type { DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren, ReactNode } from "react"

import {iding, subscribe, modelProps, viewerProps} from "./utils"

type tLabelProps = Omit<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  "htmlFor"
>
type tInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "name"|"type"|"value"
>

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

type sBoolean = {
  "type": "boolean"
}

type tStoreProps = {
  // TODO $ref? -> form
  // TODO "namespace": string
  "properties": Record<string, Partial<
    sBoolean
    & {
      "default": unknown
      "enum": unknown[] // TODO "oneOf": unknown[]

      "properties": Record<string, unknown>

      "maxProperties": number
      "maxItems": number
      "items": unknown[] | Record<string, unknown>
    }
  >>
} & tInputProps

const {keys: $keys} = Object
, {isArray: $isArray} = Array

export type {
  tControllerProps
}

export {
  Store, Controller,
  modelProps, viewerProps, subscribe
}

function Store({properties, ...props}: tStoreProps) {
  const elements: ReactNode[] = []

  for (const name in properties) {
    const {
      type,
      "enum": $enum,
      "properties": nestedProps,
      maxProperties,
      items,
      maxItems,
      "default": $default
    } = properties[name]

    if (type === "boolean") {
      elements.push(<input {...{
        "key": name,
        "type": "checkbox",
        "defaultChecked": $default === true,
        ...modelProps(name),
        ...props
      }}/>)
      continue
    }

    const source = $enum
    ?? (nestedProps ? $keys(nestedProps) : undefined)
    ?? ($isArray(items) ? items : undefined)
    , length = source?.length ?? maxProperties ?? maxItems
    , els = new Array(length)
    , htmlType = $enum ? "radio": "checkbox"

    for (let i = 0; i < length; i++) {
      const value = source?.[i] ?? i

      els[i] = <input {...{
        "key": `${name}/${i}`,
        "type": htmlType,
        "defaultChecked": $default === value,
        ...modelProps(name, value),
        ...props
      }} />
    }

    elements.push(...els)
  }

  return <>{elements}</>
}

function Controller({children, property, value, "subscribe": s, ...props}: tControllerProps) {
  return <label {...{
    ...props,
    ...subscribe(s),
    "htmlFor": iding(property, value)
  }}>{children}</label>
}
