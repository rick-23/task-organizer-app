import { connectToDatabase } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();
export async function POST(request: NextRequest) {
  try {
    console.log("Forgot password request received");
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    if (!user.isVerfied) {
      return NextResponse.json(
        { error: "User not verified." },
        { status: 400 }
      );
    }

    // send verification email
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    console.log("Forgot password request successful");
    return NextResponse.json({
      message: "Forgot password raised successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
