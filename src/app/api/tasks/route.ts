import { connectToDatabase } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const tasksForUser = await Task.find({ userId });
    return NextResponse.json({
      message: "Tasks for user found",
      data: tasksForUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
