import type { tSchema } from "./defs"

const {keys: $keys} = Object
, {isArray: $isArray} = Array

export {resolve, getIdentifier}

function resolve(input: tSchema["properties"][string]) {
  const {
    // type,
    "enum": $enum,
    "properties": nestedProps,
    maxProperties,
    items,
    maxItems,
  } = input

  // if (type === "boolean") {
  //   elements.push(<input {...{
  //     "key": name,
  //     "type": "checkbox",
  //     "defaultChecked": $default === true,
  //     ...modelProps(name),
  //     ...props
  //   }}/>)
  //   continue
  // }

  const source = $enum
  ?? (nestedProps ? $keys(nestedProps) : undefined)
  ?? ($isArray(items) ? items : undefined)
  , length = source?.length ?? maxProperties ?? maxItems

  return {
    source,
    length
  }
}

function getIdentifier(source: unknown[], i: number) {
  //TODO fix `value === null`
  const value = source?.[i] ?? i
  
  return (
    value === null || typeof value !== "object"
    ? value
    : value.hasOwnProperty("valueOf")
    ? +value
    : value.hasOwnProperty("toString")
    ? value
    : i
  ) as string|number
}
