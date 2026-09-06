import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Content } from "@/models/Content";

const DEFAULT_SCRIPTS = {
  enabled: true,
  gtmId: "GTM-NP89TC9W",
  gaMeasurementId: "",
  metaPixelId: "967268962583650",
  linkedinPartnerId: "9941372",
  customHeadScripts: "",
  customBodyScripts: "",
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(DEFAULT_SCRIPTS);
    }

    const content = await Content.findOne({ section: "scripts" });
    if (!content || !content.data) {
      return NextResponse.json(DEFAULT_SCRIPTS);
    }

    return NextResponse.json({ ...DEFAULT_SCRIPTS, ...content.data });
  } catch (error) {
    console.error("Failed to fetch script content:", error);
    return NextResponse.json(DEFAULT_SCRIPTS);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const updated = await Content.findOneAndUpdate(
      { section: "scripts" },
      { data: body },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updated.data });
  } catch (error) {
    console.error("Failed to update script content:", error);
    return NextResponse.json({ error: "Failed to update scripts" }, { status: 500 });
  }
}
