import json from "@remix-run/node"; // for loader
import { useLoaderData } from "@remix-run/react"; // for component
import { getDiscountCodes } from "~/utils/discounts.server"; // Adjust path based on your project structure

// Define the loader to fetch discount codes
export async function loader({ request }) {
  const discounts = await getDiscountCodes({ request });
  return json({ discounts });
}

// Component to display the discount codes
export default function Discounts() {
  const { discounts } = useLoaderData();

  return (
    <div>
      <h1>Discount Codes</h1>
      {discounts.length > 0 ? (
        <ul>
          {discounts.map((discount, index) => (
            <li key={index}>
              <h2>{discount.name}</h2>
              <p>Created At: {new Date(discount.createdAt).toLocaleString()}</p>
              {discount.endsAt && (
                <p>Ends At: {new Date(discount.endsAt).toLocaleString()}</p>
              )}
              {discount.usageLimit && <p>Usage Limit: {discount.usageLimit}</p>}
              {discount.minimumRequirement && (
                <p>
                  Minimum Requirement:{" "}
                  {discount.minimumRequirement.__typename ===
                  "DiscountMinimumQuantity"
                    ? `${discount.minimumRequirement.greaterThanOrEqualToQuantity} items`
                    : `$${discount.minimumRequirement.greaterThanOrEqualToSubtotal.amount} ${
                        discount.minimumRequirement.greaterThanOrEqualToSubtotal
                          .currencyCode
                      }`}
                </p>
              )}
              {/* Add more details as necessary */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No discounts available.</p>
      )}
    </div>
  );
}

// export async function getDiscountCodes({ request }) {
//   return discountNodes.nodes.map(({ discount }) => ({
//     name: discount.name,
//     usageLimit: discount.usageLimit,
//     createdAt: discount.createdAt,
//     endsAt: discount.endsAt,
//     minimumRequirement: discount.minimumRequirement,
//   }));