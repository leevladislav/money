export function getObjectUrlParams(filter: object) {
  return Object.entries(filter).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        return {...acc, [key]: value};
      }
      return acc;
    }, {}
  );
}

export function getStringUrlParams(filter: object): string {
  const params = Object.entries(filter).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        if (Array.isArray(value) && value.length) {
          return `${acc}${stringPhpArrayParams(key, value)}`;
        }
        return `${acc}&${key}=${value}`;
      }
      return acc;
    }, ''
  );

  return params.slice(1, params.length);
}


export function stringPhpArrayParams(key: string, data: any[]): string {
  let arrayParams = '';
  data.forEach((item, index) => {
    arrayParams += `&${key}[${index}]=${item}`;
  });
  return arrayParams;
}
