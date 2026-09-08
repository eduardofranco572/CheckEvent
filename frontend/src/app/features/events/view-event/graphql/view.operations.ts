import { gql } from 'apollo-angular';

export const GET_EVENT_BY_ID_QUERY = gql`
  query GetEvent($public_id: String!) {
    event(public_id: $public_id) {
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
      subscribers_count
      is_subscribed
      user {
        id
      }
    }
  }
`;

export const SUBSCRIBE_EVENT_MUTATION = gql`
  mutation SubscribeToEvent($eventId: ID!) {
    subscribeToEvent(event_id: $eventId)
  }
`;
