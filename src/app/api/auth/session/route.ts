import { NextResponse } from "next/server";

export async function GET(){
  const user = 'Hello World'

  return NextResponse.json(user);
}