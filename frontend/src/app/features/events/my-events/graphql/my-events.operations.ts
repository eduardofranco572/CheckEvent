import { gql } from 'apollo-angular';

export const GET_MY_SUBSCRIBED_EVENTS_QUERY = gql`
  query GetMySubscribedEvents($first: Int!, $page: Int) {
    mySubscribedEvents(first: $first, page: $page) {
      data {
        id
        public_id
        name
        date
        time
        street
        city
        cover
      }
      paginatorInfo {
        hasMorePages
        currentPage
        lastPage
        total
      }
    }
  }
`;
