import { authenticate } from "../shopify.server";

export const fetchDiscountCodes = async (request) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query getDiscounts {
        discountNodes(first: 10, reverse: true) {
          nodes {
            discount {
              ... on DiscountCodeBasic {
                endsAt
                recurringCycleLimit
                title
                usageLimit
                minimumRequirement {
                  ... on DiscountMinimumQuantity {
                    __typename
                    greaterThanOrEqualToQuantity
                  }
                  ... on DiscountMinimumSubtotal {
                    __typename
                    greaterThanOrEqualToSubtotal {
                      amount
                      currencyCode
                    }
                  }
                }
                startsAt
                status
                summary
                shareableUrls {
                  url
                  title
                }
                customerGets {
                  items {
                    ... on DiscountProducts {
                      __typename
                      products(first: 10) {
                        nodes {
                          id
                          title
                        }
                      }
                    }
                    ... on DiscountCollections {
                      __typename
                      collections(first: 10) {
                        nodes {
                          description(truncateAt: 10)
                        }
                      }
                    }
                    ... on AllDiscountItems {
                      __typename
                      allItems
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        first: 10,
        reverse: true,
      },
    },
  );

  const result = await response.json();
  return result.data.discountNodes.nodes;
};
