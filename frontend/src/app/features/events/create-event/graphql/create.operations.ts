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
    $street: String!, 
    $city: String!, 
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
