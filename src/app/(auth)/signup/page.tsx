"use client";

import Link from "next/link";

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

const formSchema = z.object({
  email: z.string().min(2).max(50),
  name: z.string(),
  username: z.string(),
  password: z.string().min(8),
});

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                onSubmit={form.handleSubmit(onSubmit)}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" placeholder="Username" {...field} />
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
                  Sign up
                </Button>
                <div className="text-center">
                  <small className=" text-muted-foreground">
                    Have an account?&nbsp;
                    <Link href="/login" className="text-blue-500">
                      Log in
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
