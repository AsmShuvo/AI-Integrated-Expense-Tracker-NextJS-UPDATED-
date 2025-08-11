// Server actions are functions that we can call directly from a client component / as a form action.
"use server";

import { categorizeExpense } from "@/lib/ai";


export async function suggestCategory(description) {
  try {
    if (!description || description.trim().length < 2) {
      return {
        category: "Other",
        error: "Description too short for AI analysis",
      };
    }

    const category = await categorizeExpense(description.trim());
    return { category };
  } catch (error) {
    console.error("❌ Error in suggestCategory server action:", error);
    return {
      category: "Other",
      error: "Unable to suggest category at this time",
    };
  }
}
