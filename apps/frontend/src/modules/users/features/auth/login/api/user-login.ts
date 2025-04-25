import { axiosClient } from "@/lib/api/axios-instance";
import { LoginInterface } from "@/services/interfaces/auth.interface";
import { LoginResponse } from "@/services/types/auth.type";

export async function getLogin(
  data: LoginInterface
): Promise<LoginResponse | undefined> {
  const client = axiosClient();
  const { email, password } = data;
  try {
    const response = await client.post(`/auth/login`, {
      email,
      password,
    });
    if (![200, 201, 202].includes(response.status))
      throw new Error(response.data.message);
    return response.data as LoginResponse;
  } catch (error) {
    console.error("Login error", error);
  }
  return undefined;
}
