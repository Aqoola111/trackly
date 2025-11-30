import {Logo} from "@/components/logo";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {auth} from "@/lib/auth";
import {authClient} from "@/lib/auth-client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

interface SignInCardProps {
	changeFlow: () => void;
}

const signInSchema = z.object({
	email: z.email('Email must be valid'),
	password: z.string().min(8, 'Password must be at least 8 characters long').max(32, 'Password must be at most 32 characters long'),
	rememberMe: z.boolean(),
})

type signInSchemaType = z.infer<typeof signInSchema>;

export const SignInCard = ({changeFlow}: SignInCardProps) => {
	const router = useRouter()
	const form = useForm<signInSchemaType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false
		}
	})
	
	const onSubmit = async (data: signInSchemaType) => {
		await authClient.signIn.email({
			email: data.email,
			password: data.password,
			rememberMe: data.rememberMe
		}, {
			onSuccess: () => {
				router.push('/')
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
						Welcome Back!
					</span>
				</CardTitle>
				<CardDescription>
					Login to your account to continue.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
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
							name="password"
							render={({field}) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="example@m.com"
											type="password"
											{...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField name={'rememberMe'} control={form.control} render={({field}) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange}/>
									</FormControl>
									<FormLabel>Remember me</FormLabel>
								</div>
								<FormMessage/>
							</FormItem>
						)}/>
						<Button type={'submit'} className='w-full md:w-fit'>
							Sign In
						</Button>
					</form>
				</Form>
				<CardFooter className='mt-4'>
					Don&apos;t have an account?
					<Button variant='link' onClick={changeFlow}>
						Sign up
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	)
};