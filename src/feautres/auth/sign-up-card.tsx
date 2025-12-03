import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {authClient} from "@/lib/auth-client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

interface SignUpCardProps {
	changeFlow: () => void;
}

const signUpSchema = z.object({
	email: z.email('Email must be valid'),
	password: z.string().min(8, 'Password must be at least 8 characters long').max(32, 'Password must be at most 32 characters long'),
	name: z.string().min(2, 'Name must be at least 2 characters long').max(50, 'Name must be at most 50 characters long'),
	confirmPassword: z.string().min(8, 'Password must be at least 8 characters long').max(32, 'Password must be at most 32 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ['confirmPassword'],
})

type signUpSchemaType = z.infer<typeof signUpSchema>;

export const SignUpCard = ({changeFlow}: SignUpCardProps) => {
	const router = useRouter()
	const form = useForm<signUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			name: ''
		}
	})
	
	const onSubmit = async (data: signUpSchemaType) => {
		await authClient.signUp.email({
			email: data.email,
			password: data.password,
			name: data.name
		}, {
			onSuccess: () => {
				router.push('/habits')
			},
			onError: (ctx) => {
				toast.error(ctx.error.message);
			}
		})
	}
	
	
	return (
		<Card className='w-full md:w-[400px]'>
			<CardHeader>
				<CardTitle>
					<span>
						Welcome
					</span>
				</CardTitle>
				<CardDescription>
					Create an account to get started.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex gap-2'>
							<FormField
								control={form.control}
								name="email"
								render={({field}) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="example@m.com"
												type="text"
												{...field} />
										</FormControl>
										<FormMessage/>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({field}) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="John doe"
												type="text"
												{...field} />
										</FormControl>
										<FormMessage/>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="password"
							render={({field}) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="VeryStrongPassword123!"
											type="password"
											{...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({field}) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input
											placeholder="VeryStrongPassword123!"
											type="password"
											{...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<Button type={'submit'} className='w-full md:w-fit'>
							Sign Up
						</Button>
					</form>
				</Form>
				<CardFooter className='mt-4'>
					Already have an account?
					<Button variant='link' onClick={changeFlow}>
						Sign in
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	)
};