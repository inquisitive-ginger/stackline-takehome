import { delay, http, HttpResponse } from "msw";
import productData from "./stackline_frontend_assessment_data_2021.json";
import { Product } from "../products/types";

type Params = {
  id: string;
};

async function productsResolver({ params }: { params: Params }) {
  // emulate "real-world" network dynamics
  await delay();

  return HttpResponse.json(
    productData.find((p: Product) => p.id === params.id)
  );
}

// simple HTTP request interceptor used to serve mocked data
export const handlers = [http.get("api/products/:id", productsResolver)];
