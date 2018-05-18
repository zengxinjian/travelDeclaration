// Map 转 对象
const mapToObj = (strMap) => {
  const obj = Object.create(null);
  for (const [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
};

// 对象 转 Map
const objToMap = (obj) => {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
};

// Map 转 Json
const mapToJson = strMap => JSON.stringify(mapToObj(strMap));

// Json 转 Map
const jsonToMap = jsonStr => objToMap(JSON.parse(jsonStr));

// Map 转 url参数
const mapToUrlParame = (map) => {
  let result = '';
  for (const [key, value] of map) {
    result += `${key}=${value}&`;
  }
  return result.substr(0, result.length - 1);
};

// Map 拷贝
const extend = (defaultOpt, opts) => {
  const opt = new Map([...opts]);

  for (const [key, value] of defaultOpt) {
    if (!opts.has(key)) {
      opt.set(key, value);
    }
  }

  return opt;
};

// object 转 url参数
const objToUrlParame = (data) => {
  let result = '';
  if (!data) {
    return result;
  }

  for (const item of Object.keys(data)) {
    result += `${item}=${data[item]}&`;
  }
  if (result) {
    result = result.substr(0, result.length - 1);
  }

  return result;
};

// object 转 FormData
const objToFormData = (data) => {
  const result = new FormData();

  if (!data) {
    return result;
  }

  for (const item of Object.keys(data)) {
    result.append(item, data[item]);
  }

  return result;
};

export default {
  extend,
  mapToJson,
  objToMap,
  mapToObj,
  jsonToMap,
  mapToUrlParame,
  objToUrlParame,
  objToFormData
};
