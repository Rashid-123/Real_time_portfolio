
import { NextResponse } from "next/server";
export async function GET() {
  try {

    console.log(process.env.BACKEND_URL)
    const response = await fetch(`${process.env.BACKEND_URL}/portfolio`, {
      //---------- Here i am using caching 
      next: { revalidate: 15 }, 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio data: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error fetching portfolio data" },
      { status: 500 }
    );
  }
}
