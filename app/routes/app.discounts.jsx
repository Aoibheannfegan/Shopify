import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { fetchDiscountCodes } from "../utils/discounts.server";

export const loader = async ({ request }) => {
  const discounts = await fetchDiscountCodes(request);
  return json({ discounts });
};

export default function DiscountsPage() {
  const { discounts } = useLoaderData();

  return (
    <Page>
      <TitleBar title="Discounts" />
      <Layout>
        <Layout.Section>
          <Card title="Discounts">
            {discounts.length > 0 ? (
              <List>
                {discounts
                  .filter((discount) => discount.discount.title)
                  .map((discount, index) => (
                    <List.Item key={index}>
                      <Text as="h3" variant="headingSm">
                        {discount.discount.title}
                      </Text>
                      {discount.discount.startsAt && (
                        <Text as="p">
                          Starts At:{" "}
                          {new Date(
                            discount.discount.startsAt,
                          ).toLocaleString()}
                        </Text>
                      )}
                      {discount.discount.endsAt && (
                        <Text as="p">
                          Ends At:{" "}
                          {new Date(discount.discount.endsAt).toLocaleString()}
                        </Text>
                      )}
                      {discount.discount.summary && (
                        <Text as="p">Summary: {discount.discount.summary}</Text>
                      )}
                      {discount.discount.usageLimit && (
                        <Text as="p">
                          Usage Limit: {discount.discount.usageLimit}
                        </Text>
                      )}
                    </List.Item>
                  ))}
              </List>
            ) : (
              <Text as="p">No discounts available.</Text>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
