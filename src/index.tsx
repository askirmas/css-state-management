import type { ReactNode } from "react"
import {memo} from "react"
import tryCall  from "./tryCall"
import type { DataOrFunction } from "./tryCall"
import {iding, subscribe, modelProps, viewerProps} from "./helpers"
import type { tControllerProps, tInputProps, tSchema, tStoreProps } from "./defs"
import { getIdentifier, resolve } from "./resolve"

const StoreMemed = memo(ModelStore)
, ControllerMemed = memo(Controller)

export default create
export {
  ModelStore, Controller,
  modelProps, viewerProps, subscribe
}

function create<P extends string = string>(
  schema: tSchema<P>,
  storeProps?: tInputProps,
  controllersProps?: Record<P, DataOrFunction<Parameters<typeof ControllerMemed>[0]>>
) {
  const {properties} = schema
  , Controllers = {} as Record<P, JSX.Element[] | JSX.Element>

  for (const property in properties) {
    const propertySchema = properties[property]
    , {
      type
    } = propertySchema
    
    if (type === "boolean") {
      //@ts-ignore
      Controllers[property] = <ControllerMemed {...{
        "key": property,
        property,
        "value": undefined,
        ...tryCall(controllersProps[property])
      }}/>
      continue
    }

    const {source, length} = resolve(propertySchema)
    Controllers[property] = new Array(length)
    const controls = Controllers[property]

    for (let i = length; i--;) {
      const value = getIdentifier(source, i)

      //@ts-ignore
      controls[i] = <ControllerMemed {...{
        "key": `${property}=${value}`,
        property,
        value,
        ...tryCall(controllersProps[property], [value])
      }}/>
    }
  }

  return {
    "ModelStore": <StoreMemed {...{schema, ...storeProps}} />,
    Controllers
  }
}

function ModelStore({schema: {properties}, ...props}: tStoreProps) {
  const elements: ReactNode[] = []

  for (const name in properties) {
    const propertySchema = properties[name]
    , {
      type,
      "enum": $enum,
      "default": $default
    } = propertySchema

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

    const {source, length} = resolve(propertySchema)
    , els = new Array(length)
    , htmlType = $enum ? "radio": "checkbox"

    for (let i = 0; i < length; i++) {
      //TODO fix `value === null`
      const identifier = getIdentifier(source, i)

      els[i] = <input {...{
        "key": `${name}/${i}`,
        "type": htmlType,
        //TODO or `=== normalized`
        "defaultChecked": $default === (source?.[i] ?? i),
        ...modelProps(name, identifier),
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
