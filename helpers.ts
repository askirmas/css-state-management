import config from "./reactive_config.json"

const {keys: $keys} = Object
, {
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
  const properties = $keys(model)
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

function iding(property?: number|string, value?: unknown) {
  if (!allowedTypes.has(typeof property))
    return

  const stringed = value === null || value === undefined
  ? undefined
  : value

  return `${
    property
  }${
    stringed === undefined
    ? ""
    : `--${stringed}`
  }`
}


function modelProps(property?: number|string, value?: unknown, store?: string) {
  return {
    "id": iding(property, value),
    "name": property?.toString(),
    // value,
    "form": store,
  } as const
}
