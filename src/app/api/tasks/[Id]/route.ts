import { connectToDatabase } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function PUT(request: NextRequest) {
  try {
    const taskId = request.url.split("/").filter(Boolean).pop();
    const requestBody = await request.json();
    const { title, description, dueBy, done } = requestBody;
    const taskItem = await Task.findById({ _id: taskId });
    if (!taskItem) {
      return NextResponse.json({ error: "Task not found" }, { status: 400 });
    }
    let createdOn = new Date().toString();
    const result = await Task.updateOne(
      { _id: taskId },
      { $set: { title, description, dueBy, done, createdOn } }
    );
    if (result.matchedCount > 0) {
      console.log("Task updated successful");
      return NextResponse.json({
        message: "Task updated successfully",
        success: true,
      });
    } else {
      console.log("No matching task was found");
      return NextResponse.json({
        message: "No matching task was found",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const taskId = request.url.split("/").filter(Boolean).pop();
    console.log(taskId);
    const taskItem = await Task.findById({ _id: taskId });
    if (!taskItem) {
      return NextResponse.json({ error: "Task not found" }, { status: 400 });
    }
    const response = await Task.deleteOne({ _id: taskId });
    console.log("Task deleted successful");
    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
