import { json } from "@remix-run/node";
import { syncDiscountsToMetaobjects } from "../utils/discounts.server";

export const action = async ({ request }) => {
  try {
    await syncDiscountsToMetaobjects(request);
    return json({ success: true });
  } catch (error) {
    console.error("Error syncing discounts:", error);
    return json({ error: error.message }, { status: 500 });
  }
};
