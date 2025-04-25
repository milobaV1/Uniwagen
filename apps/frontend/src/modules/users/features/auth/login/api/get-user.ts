import { axiosClient } from "@/lib/api/axios-instance";
import { User } from "@/services/interfaces/user.interface";

export async function getUser(userId: string): Promise<User | undefined> {
  const client = axiosClient();
  try {
    const response = await client.get(`users/get-user/${userId}`);
    console.log(`User with id: ${userId}: `, response.data);
    return response.data as User;
  } catch (error) {
    console.error("Get user error: ", error);
  }
}
