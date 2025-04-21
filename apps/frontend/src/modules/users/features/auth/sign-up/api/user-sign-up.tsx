import { axiosClient } from "@/lib/api/axios-instance";
import { UserSignUpInterface } from "../interface";

type SignUpResponse = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
};

export async function createUser(
  data: UserSignUpInterface
): Promise<SignUpResponse | undefined> {
  const client = axiosClient();
  try {
    const response = await client.post(`/users/create`, data);
    if (![200, 201, 202].includes(response.status))
      throw new Error(response.data.message);
    return response.data as SignUpResponse;
  } catch (error) {
    console.error("Sign Up error", error);
  }
  return undefined;
}
