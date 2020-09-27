import type { DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren, ReactNode, ReactText } from "react"

export type {
  tControllerProps, tInputProps, tSchema, tStoreProps
}

type tLabelProps = Omit<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  "htmlFor"
>
type tInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"|"name"|"type"|"value"
>

type tControllerProps = PropsWithChildren<tLabelProps & {
  "property": string|number
  "value": undefined|string|number
  "subscribe"?: string
}>

type sBoolean = {
  "type": "boolean"
}

type tPropertySchema = Partial<
  sBoolean
  & {
    "default": unknown
    "enum": unknown[] // TODO "oneOf": unknown[]

    "properties": Record<string, unknown>

    "maxProperties": number
    "maxItems": number
    "items": unknown[] | Record<string, unknown>
  }
>

type tSchema<P extends string = string> = {
  // TODO $ref? -> form
  // TODO "namespace": string
  // TODO "required" helps to default item#0
  "properties": Record<P, tPropertySchema>
}

type tStoreProps = {"schema": tSchema} & tInputProps
