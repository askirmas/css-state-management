import { stringify } from "querystring"
import config from "./reactive_config.json"

const {
  listenerAttribute,
  viewerAttribute
} = config
, allowedTypes = new Set(["string", "number"])

export {
  subscribe,
  viewerProps,
  modelProps,
  iding
}

function subscribe(...variables: (undefined|string)[]) {
  return attributing(listenerAttribute, variables)
}

function viewerProps(model: Record<string|number, string|number>) {
  const properties = Object.keys(model)
  .map(property => iding(property, model[property]))

  return attributing(viewerAttribute, properties)
}

function attributing(base: string, entries: string[]) {
  const attributes: Record<string, boolean> = {}
  , {length} = entries

  for (let i = length; i--;) {
    const entry = entries[i]
    entry && (attributes[`${base}-${entry}`] = true)
  }
    
  return attributes
}

function iding(property?: number|string, value?: number|string) {
  return  allowedTypes.has(typeof property) && allowedTypes.has(typeof value)
  ? `${property}--${value}`
  : undefined
}


function modelProps(property?: number|string, value?: number|string, store?: string) {
  return {
    "id": iding(property, value),
    "name": property?.toString(),
    // value,
    "form": store,
  } as const
}
