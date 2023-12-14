# Stackline Frontend Assessment

Simple product page with basic product details, weekly sales chart and table. Implemented using React, Redux (RTK Query) and Tailwind CSS.

## Details

- The `/app` folder contains top-level components and store configuration. The `/products` folder contains the feature-specific components and store slice used to build up the product page.
- Uses [Mock Service Worker](https://mswjs.io/) to intercept requests from the client and serve the mock data. See the `/mocks` folder for details.
- Uses Redux Toolkit, specifically [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) to manage product sales state. See `/app/store.ts` and `/products/product-api.slice.ts` for details.
- Uses [ChartJS](https://www.chartjs.org/docs/latest/) and its React wrapper (`react-chartjs-2`) for the sales chart. See `/products/ProductSalesChart.tsx` and `/products/utils/prepare-chart-data.ts` for details.
