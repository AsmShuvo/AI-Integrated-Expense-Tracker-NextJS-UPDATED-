"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function addExpenseRecord(formData) {
    // getting values from forms
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");
  const categoryValue = formData.get("category");
  const dateValue = formData.get("date");

  if (
    !textValue ||
    textValue === "" ||
    !amountValue ||
    !categoryValue ||
    categoryValue === "" ||
    !dateValue ||
    dateValue === ""
  ) {
    return { error: "Text, amount, category, or date is missing" };
  }

  const text = textValue.toString();
  const amount = parseFloat(amountValue.toString());
  const category = categoryValue.toString(); 
  let date;
  try {
    // Parse the date String to yyyy-mm-dd format and create a date at noon UTC to avoid timezone issues
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split("-");
    const dateObj = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
    );
    date = dateObj.toISOString();
  } catch (error) {
    console.error("Invalid date format:", error);
    return { error: "Invalid date format" };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const createdRecord = await db.record.create({
      data: {
        text,
        amount,
        category,
        date, // added here
        userId,
      },
    });

    const recordData = {
      text: createdRecord.text,
      amount: createdRecord.amount,
      category: createdRecord.category,
      date: createdRecord.date?.toISOString() || date,
    };
    // rerendering to new UI
    revalidatePath("/");

    return { data: recordData };
  } catch (error) {
    console.error("Error adding expense record:", error);
    return {
      error: "An unexpected error occurred while adding the expense record.",
    };
  }
}

export default addExpenseRecord;
