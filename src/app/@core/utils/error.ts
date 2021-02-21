

export function parseErrroMessage(e: any) {
  const message = e.error.message;
  const m = Object.keys(message).reduce((acc, key) => {
    const value = message[key];
    return `${acc} ${key} - ${value} \n`
  }, '');
  return m;
}
