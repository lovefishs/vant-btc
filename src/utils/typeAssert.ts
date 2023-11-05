// 获取对象类型字符串
export function getTag(value: any): string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }

  return Object.prototype.toString.call(value)
}

export function isNumber(value: any): value is number {
  return getTag(value) === '[object Number]'
}

export const isInteger =
  Number.isInteger ||
  function _isInteger(value: any): value is number {
    return value << 0 === value
  }

export function isString(value: any): value is string {
  const type = typeof value

  return (
    type === 'string' ||
    (type === 'object' &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) == '[object String]')
  )
}

export function isBoolean(value: any): value is boolean {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
  )
}

export function isUndefined(value: any): value is undefined {
  return value === undefined
}

export const isArray =
  Array.isArray ||
  function _isArray(value: any): value is any[] {
    return value != null && value.length >= 0 && getTag(value) === '[object Array]'
  }

export function isFunction(value: any): value is (...args: any[]) => any {
  const type = getTag(value)

  return (
    type === '[object Function]' ||
    type === '[object AsyncFunction]' ||
    type === '[object GeneratorFunction]' ||
    type === '[object AsyncGeneratorFunction]'
  )
}

export function isObject(value: any): value is object {
  const type = typeof value

  return value != null && (type === 'object' || type === 'function')
}

export function isObjectLike(value: any): value is object {
  return typeof value === 'object' && value !== null
}

export function isPlainObject(value: any): value is object {
  if (!isObjectLike(value) || getTag(value) != '[object Object]') {
    return false
  }

  if (Object.getPrototypeOf(value) === null) {
    return true
  }

  let proto = value

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(value) === proto
}

export function isRegExp(value: any): value is RegExp {
  return getTag(value) === '[object RegExp]'
}
