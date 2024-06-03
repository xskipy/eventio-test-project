interface AuthResponse {
  // The user's ID. Not available for create/update operations.
  id: string;
  // User's first name
  firstName: string;
  // User's last name
  lastName: string;

  // User's email address
  email: string;

  // ISO-formatted date string when the record was created
  createdAt: string;

  // ISO-formatted date string when the record was last updated
  updatedAt: string;
}

export default AuthResponse;
