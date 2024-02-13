export const pickOption = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const pickFilter = (object, keys) => {
  let filters = [];
  keys.forEach((key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      if (key == "genre") {
        filters.push({ genre: { $in: object[key].split(",") } });
      }
      if (key == "search") {
        filters.push({ name: { $regex: object[key], $options: "i" } });
      }
      if (key === "greater_time") {
        filters.push({ runingTime: { $gte: Number(object[key]) } });
      }
      if (key === "lower_time") {
        filters.push({ runingTime: { $lte: Number(object[key]) } });
      }
      if (key === "cast") {
        filters.push({ cast: { $in: [object[key]] } });
      }
    }
  });

  return Object.keys(filters).length > 0 ? { $and: filters } : {};
};
