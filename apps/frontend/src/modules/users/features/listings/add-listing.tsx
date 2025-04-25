import { CreateListingInterface } from "@/services/interfaces/listing.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createListing } from "./api/create-listing";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthState } from "@/stores/auth.store";
import Exit from "@/assets/svg/close-circle.svg";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  imageUrl: z.string().array(),
  contactEmail: z.string().refine((value) => /^\S+@pau\.edu\.ng$/.test(value), {
    message: "Must be a valid PAU email",
  }),
  contactPhone: z
    .string()
    .min(5, { message: "Please enter a valid phone number" })
    .refine((value) => /^\+?[1-9]\d{1,14}$/.test(value), {
      message: "Please enter a valid phone number",
    }),
  userId: z.string(),
});

export const AddListing = ({
  setAdd,
}: {
  setAdd: (value: boolean) => void;
}) => {
  const { user } = useAuthState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      imageUrl: [],
      contactEmail: "",
      contactPhone: "",
      userId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (user) values.userId = user.id;
    toast(`Created listing: ${values.title}`);
    const data = values as CreateListingInterface;
    const response = await createListing(data);
    console.log(response);
  }

  const onClose = () => {
    setAdd(false);
  };
  return (
    <div className="fixed absolute inset-0 z-50 flex justify-center items-center mt-20 ml-20 w-full">
      <div className="bg-white w-[40rem] h-[30rem] border border-2 border-solid rounded-lg shadow-3xl p-5 overflow-y-auto">
        <div className="flex justify-between my-4">
          <h1 className="font-bold text-[30px]">ADD LISTING</h1>
          <img src={Exit} alt="Close" onClick={onClose} />
        </div>
        <Form {...form}>
          <div className="">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Vintage Denim Jacket"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the item"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 8000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="accessories">
                            Accessories
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seller@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+234..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Add Listing</Button>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};
