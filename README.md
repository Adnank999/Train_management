# Project Setup and API Documentation

## Setup Instructions

1. **Checkout to Master Branch**

    Ensure you are on the master branch:
    ```bash
    git checkout master
    ```

2. **Clone the Project**

    Clone the repository:
    ```bash
    git clone <repository-url>
    ```

3. **Install Dependencies**

    Navigate to the project directory and install dependencies:
    ```bash
    cd <project-directory>
    npm install
    ```

4. **Run the Server**

    Start the server:
    ```bash
    npm run dev
    ```
    The server will be available at [localhost:8080](http://localhost:8080).

## Routes and Endpoints

### User Route: `/api/users`

1. **Signup**

    - **Endpoint**: `/api/users/create`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    - **Description**: Create a new user.

2. **Signin**

    - **Endpoint**: `/api/users/login`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    - **Description**: Authenticate the user and receive a token for accessing protected routes.

### Station Route: `/api/stations`

1. **Create Station**

    - **Endpoint**: `/api/stations/create`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "name": "Station Name",
            "latitude": 40.7128,
            "longitude": -74.0060
        }
        ```
    - **Description**: Create a new station.

2. **Get Station Details**

    - **Endpoint**: `/api/stations/{stationId}`
    - **Method**: GET
    - **Parameters**: 
        - `stationId` - The ID of the station.
    - **Description**: Retrieve details of a specific station.

3. **Update Station Details**

    - **Endpoint**: `/api/stations/{stationId}`
    - **Method**: PUT
    - **Parameters**: 
        - `stationId` - The ID of the station.
    - **Request Body**:
        ```json
        {
            "name": "Updated Station Name",
            "latitude": 40.7128,
            "longitude": -74.0060
        }
        ```
    - **Description**: Update the details of a specific station.

### Train Service Route: `/api/trainServices`

1. **Create Train Service**

    - **Endpoint**: `/api/trainServices/create`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "name": "Train Service Name",
            "type": "Type",
            "schedule": [
                {
                    "stationId": "stationId",
                    "arrivalTime": "2024-08-05T10:00:00Z",
                    "departureTime": "2024-08-05T10:30:00Z"
                }
            ]
        }
        ```
    - **Description**: Create a new train service with schedule.

2. **Get Train Service Details**

    - **Endpoint**: `/api/trainServices/{trainServiceId}`
    - **Method**: GET
    - **Parameters**: 
        - `trainServiceId` - The ID of the train service.
    - **Description**: Retrieve details of a specific train service.

3. **Update Train Service**

    - **Endpoint**: `/api/trainServices/{trainServiceId}`
    - **Method**: PUT
    - **Parameters**: 
        - `trainServiceId` - The ID of the train service.
    - **Request Body**:
        ```json
        {
            "name": "Updated Train Service Name",
            "type": "Updated Type",
            "schedule": [
                {
                    "stationId": "stationId",
                    "arrivalTime": "2024-08-05T10:00:00Z",
                    "departureTime": "2024-08-05T10:30:00Z"
                }
            ]
        }
        ```
    - **Description**: Update the details of a specific train service.

### Wallet Route: `/api/funds`

1. **Add Funds**

    - **Endpoint**: `/api/funds/add-funds`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "userId": "userId",
            "amount": 100.00
        }
        ```
    - **Description**: Add funds to a user's wallet.

2. **Get Wallet Balance**

    - **Endpoint**: `/api/funds/{userId}`
    - **Method**: GET
    - **Parameters**: 
        - `userId` - The ID of the user.
    - **Description**: Retrieve the balance of a user's wallet.

### Ticket Route: `/api/tickets`

1. **Create Ticket**

    - **Endpoint**: `/api/tickets/create`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "userId": "userId",
            "trainServiceId": "trainServiceId",
            "stationIdStart": "stationIdStart",
            "stationIdEnd": "stationIdEnd",
            "travelDate": "2024-08-05T10:00:00Z"
        }
        ```
    - **Description**: Create a new ticket for a user.

2. **Purchase Ticket**

    - **Endpoint**: `/api/tickets/purchase`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "userId": "userId",
            "ticketId": "ticketId"
        }
        ```
    - **Description**: Purchase a ticket for a user.

## Notes

1. **Testing**: Use Postman to test the routes and endpoints.
2. **Authentication**: After signing in, use the token provided in the response to access protected routes. Include the token in the `Authorization` header as a `Bearer` token.

