"use client";
import React from 'react';
import Input from '@/components/Input';
import Textarea from '@/components/TextArea';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, Control, UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormFieldProps {
    question: any;
    register: UseFormRegister<Record<string, any>>;
    control: Control<Record<string, any>>;
    errors: FieldErrors<Record<string, any>>;
}

export function FormField({ question, register, control, errors }: FormFieldProps) {
    const labelText = `${question.question_text}${question.required ? ' *' : ''}`;
    const fieldError = errors[question.id.toString()]?.message as string;
    const isInvalid = !!fieldError;

    if (question.type === 'text') {
        return (
        <Field data-invalid={isInvalid ? true : undefined}>
            <FieldLabel htmlFor={question.id.toString()} className="text-sm font-medium text-gray-900">
            {labelText}
            </FieldLabel>
            <Input 
            id={question.id.toString()}
            placeholder="Your answer"
            {...register(question.id.toString())}
            aria-invalid={isInvalid}
            />
            {fieldError && <FieldError>{fieldError}</FieldError>}
        </Field>
        )
    }

    if (question.type === 'textarea') {
        return (
        <Field data-invalid={isInvalid ? true : undefined}>
            <FieldLabel htmlFor={question.id.toString()} className="text-sm font-medium text-gray-900">
            {labelText}
            </FieldLabel>
            <Textarea 
            id={question.id.toString()}
            placeholder="Your answer" 
            rows={3}
            {...register(question.id.toString())}
            aria-invalid={isInvalid}
            />
            {fieldError && <FieldError>{fieldError}</FieldError>}
        </Field>
        )
    }

    if (question.type === 'radio') {
        return (
        <Controller
            control={control}
            name={question.id.toString()}
            render={({ field }) => (
            <FieldSet data-invalid={isInvalid ? true : undefined}>
                <FieldLegend variant="label" className="text-sm font-medium text-gray-900">
                {labelText}
                </FieldLegend>
                <RadioGroup 
                onValueChange={field.onChange} 
                value={field.value} 
                className="mt-2 space-y-2">
                {question.options.map((opt: string, i: number) => {
                    const optionId = `radio-${question.id}-${i}`
                    return (
                    <Field key={i} orientation="horizontal" className="flex items-center gap-3">
                        <RadioGroupItem
                        className="data-[state=checked]:border-blue1 data-[state=checked]:text-blue1"
                        value={opt} 
                        id={optionId} 
                        aria-invalid={isInvalid} />
                        <FieldLabel htmlFor={optionId} className="font-normal text-gray-700 text-sm cursor-pointer">
                        {opt}
                        </FieldLabel>
                    </Field>
                    )
                })}
                </RadioGroup>
                {fieldError && <FieldError>{fieldError}</FieldError>}
            </FieldSet>
            )}/>
        )
    }

    if (question.type === 'checkbox') {
        return (
        <Controller
            control={control}
            name={question.id.toString()}
            render={({ field }) => (
            <FieldSet data-invalid={isInvalid ? true : undefined}>
                <FieldLegend variant="label" className="text-sm font-medium text-gray-900">
                {labelText}
                </FieldLegend>
                <FieldGroup className="mt-2">
                {question.options.map((opt: string, i: number) => {
                    const optionId = `checkbox-${question.id}-${i}`
                    const isChecked = Array.isArray(field.value) && field.value.includes(opt);
                    
                    return (
                    <Field key={i} orientation="horizontal" className="flex items-center gap-3">
                        <Checkbox
                        className="data-[state=checked]:border-blue1 data-[state=checked]:bg-blue1"
                        id={optionId}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                            const currentVal = Array.isArray(field.value) ? field.value : []
                            const newVal = checked 
                            ? [...currentVal, opt] 
                            : currentVal.filter((val) => val !== opt)
                            field.onChange(newVal)
                        }}
                        aria-invalid={isInvalid}/>
                        <FieldLabel htmlFor={optionId} className="font-normal text-gray-700 text-sm cursor-pointer">
                        {opt}
                        </FieldLabel>
                    </Field>
                    )
                })}
                </FieldGroup>
                {fieldError && <FieldError>{fieldError}</FieldError>}
            </FieldSet>
            )}/>
        )
    }

    if (question.type === 'dropdown') {
        return (
        <Controller
            control={control}
            name={question.id.toString()}
            render={({ field }) => (
            <Field>
                <FieldLabel htmlFor={question.id.toString()} className="text-sm font-medium text-gray-900">
                {labelText}
                </FieldLabel>
                <Select 
                onValueChange={field.onChange} 
                value={field.value || undefined}>
                <SelectTrigger id={question.id.toString()} className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {question.options.map((opt: string, i: number) => (
                        <SelectItem key={i} value={opt}>{opt}</SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
                {fieldError && <FieldError>{fieldError}</FieldError>}
            </Field>
            )}/>
        )
    }

    return null
}