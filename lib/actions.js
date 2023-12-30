'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

const invalidText = (text) => !text || text.trim() === '';

export const shareMeal = async (prevState, formData) => {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    };
    const textInputs = ['title', 'summary', 'instructions', 'creator', 'creator_email'];
    const invalidTextInput = textInputs.some((field) => invalidText(field));
    
    if (
        invalidTextInput ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid input.'
        };
    }

    await saveMeal(meal);
    redirect('/meals');
};
