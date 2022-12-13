export const alerter = (props: object, any?: string) => {
  const string =
    (any ? any + '\n' : '') +
    Object.entries(props).reduce((acc, [k, v]) => {
      return acc + `${k} : ${v}; `
    }, '')

  alert(string)
}
