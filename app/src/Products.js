import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';

const GET_PRODUCTS_BY_ID = gql`
  query {
    products(first: 100) {
      edges {
        node {
          title
          handle
          descriptionHtml
          id
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price
                id
              }
            }
          }
        }
      }
    }
  }
`;

class ResourceListWithProducts extends React.Component {
  render() {
    const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();
    return (
      <Query query={GET_PRODUCTS_BY_ID}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading…</div>;
          }
          if (error) {
            return <div>{error.message}</div>;
          }
          console.log(data.products);
          return (
            <Card>
              <ResourceList
                showHeader
                resourceName={{ singular: 'Product', plural: 'Products' }}
                items={(data && data.products.edges) || []}
                renderItem={({ node }) => {
                  const media = (
                    <Thumbnail
                      source={node.images.edges[0] ? node.images.edges[0].node.originalSrc : ''}
                      alt={node.images.edges[0] ? node.images.edges[0].node.altText : ''}
                    />
                  );
                  const price = node.variants.edges[0].node.price;
                  return (
                    <ResourceList.Item
                      id={node.id}
                      media={media}
                      accessibilityLabel={`View details for ${node.title}`}
                      onClick={() => {
                        console.info('click item');
                      }}
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">{node.title}</TextStyle>
                          </h3>
                        </Stack.Item>
                        <Stack.Item>
                          <p>${price}</p>
                        </Stack.Item>
                        <Stack.Item>
                          <p>Expires on {twoWeeksFromNow} </p>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ResourceListWithProducts;
