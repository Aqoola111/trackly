'use client';

import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {addHabitFormSchema, AddHabitFormType} from "@/feautres/habits/schemas";
import {useAddHabitModal} from "@/feautres/habits/store/use-add-habit-modal";
import {HabitCategory, HabitColor, HabitFrequency, WeekDay} from "@/generated/prisma/enums";

import {cn, HABIT_COLOR_STYLES} from "@/lib/utils";
import {trpc} from "@/trpc/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";


const AddHabitModal = () => {
	const {isOpen, close} = useAddHabitModal()
	const colors = Object.values(HabitColor);
	const frequencies = Object.values(HabitFrequency);
	const form = useForm<AddHabitFormType>({
		resolver: zodResolver(addHabitFormSchema),
		defaultValues: {
			name: "",
			color: HabitColor.GRAY,
			frequency: HabitFrequency.DAILY,
			category: null,
			weekDay: null,
			monthDay: 0,
		}
	})
	
	const utils = trpc.useContext()
	
	useEffect(() => {
		form.reset()
	}, [isOpen])
	
	
	const color = form.register('color');
	const color_value = form.watch('color')
	const frequency_value = form.watch('frequency');
	const weekDay_value = form.watch('weekDay')
	const addHabitMutation = trpc.createHabit.useMutation()
	
	
	useEffect(() => {
		form.setValue('weekDay', null)
		form.setValue('monthDay', 0)
	}, [frequency_value]);
	
	const onSubmit = (values: AddHabitFormType) => {
		addHabitMutation.mutate({
			name: values.name,
			color: values.color,
			frequency: values.frequency,
			category: values.category,
			weekDay: values.frequency === HabitFrequency.WEEKLY ? values.weekDay : null,
			monthDay: values.frequency === HabitFrequency.MONTHLY ? values.monthDay : 0,
		}, {
			onSuccess: () => {
				toast.success('Habit added successfully');
				close();
				utils.getUserHabits.invalidate()
			},
			onError: (error) => {
				toast.error(`Error adding habit: ${error.message}`);
			}
		})
	}
	
	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Add new habit
						{JSON.stringify(form.formState.errors, null, 2)}
					</DialogTitle>
					<DialogDescription>
						Fill the form below to add a new habit to track.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<FormField name={'name'} render={({field}) => (
							<FormItem>
								<FormControl>
									<Input {...field} placeholder='Habbit name' type='text'/>
								</FormControl>
							</FormItem>
						)}/>
						<div className='flex flex-col gap-2'>
							<FormLabel>
								Choose a color
							</FormLabel>
							<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
								{
									colors.map((color, index) => {
										const clr = HABIT_COLOR_STYLES[color];
										return (
											<Button type={'button'} onClick={() => form.setValue('color', color)}
													key={color}
													className={cn(clr.base, clr.hover, color_value === color && 'border-2 shadow-md rounded-xl')}
													variant={color_value === color ? 'outline' : 'default'}>
												{color}
											</Button>
										)
									})
								}
							</div>
						</div>
						<FormField name={'category'} render={({field}) => (
							<FormItem>
								<FormLabel>
									Category
								</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger>
											<SelectValue placeholder='Select category'/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{Object.values(HabitCategory).map((category) => (
													<SelectItem value={category} key={category}>
														{category}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}/>
						
						<div className='flex w-full items-center flex-col gap-2'>
							<FormLabel className='w-full'>
								Choose frequency
							</FormLabel>
							<div className='w-full flex items-center justify-between border px-2 py-2 rounded-lg'>
								{frequencies.map((frequency) => (
									<Button type='button' onClick={() => form.setValue('frequency', frequency)}
											key={frequency}
											variant={frequency_value === frequency ? 'outline' : 'ghost'}>
										{frequency}
									</Button>
								))}
							</div>
						</div>
						{frequency_value === HabitFrequency.WEEKLY && (
							<div className='grid grid-cols-3 md:grid-cols-4 gap-2 border px-2 py-2 rounded-lg'>
								{
									Object.values(WeekDay).map((day) => (
										<Button size='sm' onClick={() => form.setValue('weekDay', day)} key={day}
												type='button'
												variant={weekDay_value === day ? 'outline' : 'ghost'}>
											{day}
										</Button>
									))
								}
							</div>
						)}
						{frequency_value === HabitFrequency.MONTHLY && (
							<FormField name={'monthDay'} render={({field}) => (
								<FormItem>
									<FormLabel>
										Select day of the month (1-31)
									</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={(e) => field.onChange(Number(e.target.value))}
											type="number"
											min={0}
											max={31}
											placeholder="Day of the month"
										/>
									</FormControl>
								</FormItem>
							)}/>
						)}
						<Button disabled={addHabitMutation.isPending}>
							Add Habit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
export default AddHabitModal
