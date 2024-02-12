export const filter = (schema) => {
  schema.statics.filter = async function (filter, options) {
    // filter.active = true;
    let docsPromise = this.find(filter);
    if (options.populate) {
      options.populate.split(",").forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split(".")
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();
    const data = await docsPromise;

    return Promise.all([docsPromise]).then((values) => {
      const [results] = values;
      return Promise.resolve(results);
    });
  };
};
