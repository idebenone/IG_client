"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/components/api/authApi";
import { isLoggedIn, setToken } from "@/components/api/storageApi";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8),
});

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) router.push("/feed");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    const token = await login(values);
    setToken(token.token);
    router.push("/feed");
  };

  return (
    <div className="flex justify-center items-center w-full h-full lg:p-20">
      <div className="flex lg:border h-full w-full backdrop-blur-sm rounded-lg">
        <div className="hidden w-1/2 bg-zinc-800 p-8 lg:flex flex-col justify-between">
          <h1 className="text-4xl">Lorem ipsum dolor sit .</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum autem
            natus, nisi, quod sit veniam nobis praesentium quia laboriosam ut
            doloremque distinctio, earum necessitatibus officiis quisquam
            voluptatum. Quaerat, deserunt est.
          </p>
        </div>

        <div className="w-full lg:w-1/2 h-full flex justify-center items-center flex-col">
          <div className="lg:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
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
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          minLength={8}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center">
                  <small className=" text-muted-foreground">
                    New to Gram?&nbsp;
                    <Link href="/signup" className="text-blue-500">
                      Sign up
                    </Link>
                  </small>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
