"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getLogin } from "./api/user-login";
import { LoginInterface } from "@/services/interfaces/auth.interface";
import { decodeToken } from "@/lib/token/decode-token";
import { DecodedToken, useAuthState } from "@/stores/auth.store";
import { getUser } from "./api/get-user";
import { useNavigate } from "@tanstack/react-router";
//import { useRouter } from "@tanstack/react-router";

const formSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Enter a valid email" })
    .refine((value) => /^\S+@pau\.edu\.ng$/.test(value), {
      message: "Must be a valid PAU email",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function UserLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setUser, setAuthToken, setDecodedToken } = useAuthState();
  //const router = useRouter();
  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast(`Login attempt with email: ${values.email}`);
    const data = values as LoginInterface;
    console.log("here");
    const token = await getLogin(data);
    console.log("This is the token", token);
    if (token) {
      const payload = decodeToken(
        token.access_token
      ) as unknown as DecodedToken;
      const user = await getUser(payload.sub.id);
      if (user) setUser(user);
      setAuthToken(token.access_token);
      setDecodedToken(payload as unknown as DecodedToken);
      //router.history.push();
      navigate({ to: "/home" });
    }
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[31rem] h-[22rem] border rounded-lg shadow-lg py-5 px-8">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-3xl my-2">Sign in</h1>
            <div className="w-full p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormDescription>Enter your PAU Email.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
