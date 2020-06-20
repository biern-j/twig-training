export const sample = (arr) => {
    let result = {};

    arr.forEach((item) => result[item.name] = item.value);

    return result;
};
