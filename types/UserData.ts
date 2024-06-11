import AuthResponse from "@/types/api/AuthResponse";

type UserData = Omit<AuthResponse, "createdAt" | "updatedAt">;

export default UserData;
