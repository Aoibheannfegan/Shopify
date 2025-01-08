// app/routes/api/discounts.jsx
import json from "@remix-run/node";
import { fetchDiscountCodes } from "../../utils/discounts.server";

export const loader = async ({ request }) => {
  const discounts = await fetchDiscountCodes(request);
  return json({ discounts });
};
