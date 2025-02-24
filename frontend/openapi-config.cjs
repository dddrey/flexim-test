/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: `${process.env.VITE_API_URL}/openapi.json`,
  apiFile: "./src/store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/store/generatedApi.ts",
  exportName: "generatedApi",
  hooks: true,
};

module.exports = config;
