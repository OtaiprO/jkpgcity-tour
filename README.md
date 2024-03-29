# API Endpoints

## POST /register

Creates a new user.

**Parameters:**

- `username`: The username of the new user.
- `password`: The password of the new user.
- `refereeCode`: The referee code for the new user.

**Response:**

A message indicating the user was created successfully or an error message.

---

## POST /login

Authenticates a user.

**Parameters:**

- `username`: The username of the user.
- `password`: The password of the user.

**Response:**

A message indicating the login was successful and a token, or an error message.

---

## GET /stores/all

Retrieves all stores.

**Parameters:**

None

**Response:**

A list of all stores or an error message.

---

## GET /stores/:storeId

Retrieves a specific store.

**Parameters:**

- `storeId`: The ID of the store.

**Response:**

The store object or an error message.

---

## DELETE /stores/:storeId

Deletes a specific store.

**Parameters:**

- `storeId`: The ID of the store.

**Response:**

A message indicating the store was deleted successfully or an error message.

---

## PUT /stores/update/:storeId

Updates a specific store.

**Parameters:**

- `storeId`: The ID of the store.
- `name`: The new name of the store.
- `url`: The new URL of the store.
- `district`: The new district of the store.
- `rating`: The new rating of the store.
- `imageurl`: The new image URL of the store.
- `restaurant`: The new restaurant status of the store.
- `pharmacy`: The new pharmacy status of the store.
- `grocery`: The new grocery status of the store.
- `construction`: The new construction status of the store.
- `games`: The new games status of the store.
- `clothes`: The new clothes status of the store.
- `perfume`: The new perfume status of the store.
- `other`: The new other status of the store.

**Response:**

A message indicating the store was updated successfully or an error message.

---

## POST /stores/add

Adds a new store.

**Parameters:**

- `name`: The name of the new store.
- `url`: The URL of the new store.
- `district`: The district of the new store.
- `rating`: The rating of the new store.
- `imageurl`: The image URL of the new store.
- `restaurant`: The restaurant status of the new store.
- `pharmacy`: The pharmacy status of the new store.
- `grocery`: The grocery status of the new store.
- `construction`: The construction status of the new store.
- `games`: The games status of the new store.
- `clothes`: The clothes status of the new store.
- `perfume`: The perfume status of the new store.
- `other`: The other status of the new store.

**Response:**

A message indicating the store was added successfully or an error message.
