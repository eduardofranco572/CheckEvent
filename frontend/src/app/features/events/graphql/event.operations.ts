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
      }
    }
  }
`;

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
    }
  }
`;

export const SUBSCRIBE_EVENT_MUTATION = gql`
  mutation SubscribeToEvent($eventId: ID!) {
    subscribeToEvent(event_id: $eventId)
  }
`;

export const CREATE_EVENT_MUTATION = `
  mutation CreateEvent(
    $name: String!, 
    $date: String!, 
    $time: String!, 
    $capacity: Int!,
    $street: String!, 
    $city: String!, $price: 
    String, 
    $description: String,
    $banner: Upload, 
    $cover: Upload
  ) {
    createEvent(
      name: $name, 
      date: $date, 
      time: $time, 
      capacity: $capacity,
      street: $street,
      city: $city, 
      price: $price, 
      description: $description,
      banner: $banner, 
      cover: $cover
    ) {
      id name banner cover status
    }
  }
`;

export const UPDATE_EVENT_MUTATION = `
  mutation UpdateEvent(
    $id: ID!, 
    $name: String, 
    $date: String, 
    $time: String, 
    $capacity: Int,
    $street: String, 
    $city: String, 
    $price: String, 
    $description: String,
    $banner: Upload, 
    $cover: Upload, 
    $status: String
  ) {
    updateEvent(
      id: $id, 
      name: $name, 
      date: $date, 
      time: $time, 
      capacity: $capacity,
      street: $street, 
      city: $city, 
      price: $price, 
      description: $description,
      banner: $banner, 
      cover: $cover, 
      status: $status
    ) {
      id name banner cover status
    }
  }
`;

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
