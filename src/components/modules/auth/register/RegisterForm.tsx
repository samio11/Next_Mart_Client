"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Logo from "@/assets/icons/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  confirmPassword: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  console.log(password, confirmPassword);
  // 2. Define a submit handler.
  async function onSubmit(userData: z.infer<typeof registerSchema>) {
    const toastId = toast.loading("Registering User...");
    try {
      const res = await registerUser(userData);

      if (res?.success) {
        toast.success(res?.message || "Registered successfully!", {
          id: toastId,
        });
      } else {
        toast.error(res?.message || "Registration failed", { id: toastId });
      }

      console.log(res);
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong", { id: toastId });
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div
        className={cn("flex flex-col gap-6 w-[50%] h-auto", className)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <Logo></Logo> Register
            </CardTitle>
            <CardDescription>
              Enter your credential below to Register to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
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
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input placeholder="****" type="password" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input placeholder="****" type="password" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display password.
                      </FormDescription>
                      {confirmPassword && password !== confirmPassword ? (
                        <FormMessage>Password Does not matched</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  disabled={
                    confirmPassword && password !== confirmPassword
                      ? true
                      : false
                  }
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
