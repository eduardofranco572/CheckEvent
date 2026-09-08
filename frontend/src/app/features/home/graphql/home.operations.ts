import { gql } from 'apollo-angular';

export const GET_UPCOMING_EVENTS_QUERY = gql`
  query GetUpcomingEvents(
    $first: Int!
    $page: Int
    $name: String
    $city: String
    $price: String
    $dateFilter: String
  ) {
    upcomingEvents(
      first: $first
      page: $page
      name: $name
      city: $city
      price: $price
      date_filter: $dateFilter
    ) {
      data {
        id
        public_id
        name
        date
        time
        capacity
        street
        city
        price
        description
        banner
        cover
        status
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
