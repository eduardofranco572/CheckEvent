import { gql } from 'apollo-angular';

export const GET_EVENTS_QUERY = gql`
  query GetEvents {
    events {
      id
      name
      date
      time
      capacity
      location
      price
      description
      banner
      cover
      status
    }
  }
`;

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
      cover
      status
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
    $banner: Upload, 
    $cover: Upload
  ) {
    createEvent(
      name: $name,
      date: $date, 
      time: $time, 
      capacity: $capacity,
      location: $location, 
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
    $location: String, 
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
      location: $location, 
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
