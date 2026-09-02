import { gql } from 'apollo-angular';

export const GET_EVENT_BY_ID_QUERY = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      name
      date
      time
      capacity
      location
      price
      description
      banner
      user {
        id
      }
    }
  }
`;

export const CREATE_EVENT_MUTATION = `
  mutation CreateEvent(
    $name: String!, 
    $date: String!, 
    $time: String!, 
    $capacity: Int!, 
    $location: String!, 
    $price: String, 
    $description: String, 
    $banner: Upload
  ) {
    createEvent(
      name: $name, 
      date: $date, 
      time: $time, 
      capacity: $capacity, 
      location: $location, 
      price: $price, 
      description: $description, 
      banner: $banner
    ) {
      id name banner
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
    $location: String, 
    $price: String, 
    $description: String, 
    $banner: Upload
  ) {
    updateEvent(
      id: $id, 
      name: $name, 
      date: $date, 
      time: $time, 
      capacity: $capacity, 
      location: $location, 
      price: $price, 
      description: $description, 
      banner: $banner
    ) {
      id name banner
    }
  }
`;

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
