# Production Deployment Steps
To push a production deployment release of this app, its important you follow this steps.

This three files are required `.env`, `.env.production`, `.env.staging`.
1. `.env` - This holds environment variables for local development.
2. `.env.staging` - This holds environment variables for staging deployment.
3. `.env.production` - This holds environment variables for production deployment

This values are required in `.env`, `.env.production` & `.env.staging` file to run this application.

```bash
VITE_STRIPE_PUBLISHABLE_KEY
VITE_API_BASE_URL
```

### use this command to start or build the application

local development use to start the app.
```bash
npm run dev
```

staging deployment use to build the app for testing.
```bash
npm run build:test
```

production deployment use to build the app for production.
```bash
npm run build
```



# React + TypeScript + Vite


https://youtu.be/zNNVghu4au8?si=L2N2DpCF9gYo9REQ


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
