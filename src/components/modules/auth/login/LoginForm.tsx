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
import { loginUser, registerUser } from "@/services/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(userData: z.infer<typeof loginSchema>) {
    console.log(userData);
    const toastId = toast.loading("Logging In User...");
    try {
      const res = await loginUser(userData);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
      console.log(err);
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
              <Logo></Logo> Login
            </CardTitle>
            <CardDescription>
              Enter your credential below to Login to your account
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

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
