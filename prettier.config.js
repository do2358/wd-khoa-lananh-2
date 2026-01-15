//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  jsxSingleQuote: false,
  semi: true,
  printWidth: 200,
  bracketSpacing: true,
  bracketSameLine: false,
  // Tailwind CSS configuration
  tailwindStylesheet: './src/styles.css',
  tailwindFunctions: ['cn'],
  tailwindPreserveWhitespace: true,
  tailwindPreserveDuplicates: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
