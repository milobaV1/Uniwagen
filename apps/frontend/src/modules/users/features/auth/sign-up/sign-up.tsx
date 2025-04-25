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
import { createUser } from "./api/user-sign-up";
import { UserSignUpInterface } from "@/services/interfaces/auth.interface";

const formSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z
      .string()
      .min(5, { message: "Enter a valid email" })
      .refine((value) => /^\S+@pau\.edu\.ng$/.test(value), {
        message: "Must be a valid PAU email",
      }),
    phone: z
      .string()
      .min(5, { message: "Please enter a valid phone number" })
      .refine((value) => /^\+?[1-9]\d{1,14}$/.test(value), {
        message: "Please enter a valid phone number",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function UserSignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast(`Sign up attempt with email: ${values.email}`);
    const { confirmPassword, ...data } = values;
    const editedData = data as UserSignUpInterface;
    console.log("This is the sign up data I am sending", editedData);
    const response = await createUser(editedData);
    console.log(response);
  }

  return (
    <div className="w-full h-[100vh] bg-blue">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[31rem] h-[48rem] border rounded-lg shadow-lg py-5 px-8">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="flex justify-center text-3xl mb-4">Sign Up</h1>
            <div className="w-full p-8">
              <Form {...form}>
                <div className="">
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@pau.edu.ng" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your PAU Email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+234..." {...field} />
                          </FormControl>
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
                              placeholder="Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
