import { connectToDatabase } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const userId = getDataFromToken(request);
    const { title, description, dueBy } = requestBody;
    const task = await Task.findOne({ userId, title });
    if (task) {
      return NextResponse.json(
        { error: "Task already exists" },
        { status: 400 }
      );
    }
    const newTask = new Task({
      title,
      userId,
      description,
      done: false,
      createdOn: new Date(),
      dueBy,
    });

    const response = await newTask.save();
    console.log("Task successfully saved");
    return NextResponse.json({
      message: "Task saved successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
