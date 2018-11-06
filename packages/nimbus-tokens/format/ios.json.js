const camelCase = require("lodash/camelCase");

module.exports = result => {
  let output = {
    properties: result
      .get("props")
      .map(prop => {
        return prop.update("name", camelCase).delete("originalValue");
      })
      .toJS()
  };
  return JSON.stringify(output, null, 2);
};