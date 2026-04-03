import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

type RecordTypeValue = "INCOME" | "EXPENSE";
type CategoryValue =
  | "SALARY"
  | "FOOD"
  | "TRANSPORT"
  | "UTILITIES"
  | "ENTERTAINMENT"
  | "HEALTHCARE"
  | "OTHER";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data (optional - uncomment if needed)
  // await prisma.financialRecord.deleteMany({});
  // await prisma.user.deleteMany({});

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const analystUser = await prisma.user.upsert({
    where: { email: "analyst@example.com" },
    update: {},
    create: {
      name: "Analyst User",
      email: "analyst@example.com",
      password: await bcrypt.hash("analyst123", 10),
      role: "ANALYST",
      status: "ACTIVE",
    },
  });

  const viewerUser = await prisma.user.upsert({
    where: { email: "viewer@example.com" },
    update: {},
    create: {
      name: "Viewer User",
      email: "viewer@example.com",
      password: await bcrypt.hash("viewer123", 10),
      role: "VIEWER",
      status: "ACTIVE",
    },
  });

  console.log("✅ Users created:");
  console.log(`   - ${adminUser.email} (ADMIN)`);
  console.log(`   - ${analystUser.email} (ANALYST)`);
  console.log(`   - ${viewerUser.email} (VIEWER)`);

  // Create 20 sample financial records spread across last 6 months
  const categories = [
    "SALARY",
    "FOOD",
    "TRANSPORT",
    "UTILITIES",
    "ENTERTAINMENT",
    "HEALTHCARE",
    "OTHER",
  ] as const satisfies ReadonlyArray<CategoryValue>;
  const now = new Date();

  const records: Array<{
    amount: string;
    type: RecordTypeValue;
    category: CategoryValue;
    date: Date;
    notes: string;
    createdById: string;
  }> = [];
  for (let i = 0; i < 20; i++) {
    const isIncome = i % 3 === 0; // 1/3 of records are income
    const category =
      isIncome || i % 2 === 0
        ? categories[Math.floor(Math.random() * categories.length)]
        : "SALARY"; // SALARY is income, others are expense

    const amount =
      isIncome || category === "SALARY"
        ? Math.floor(Math.random() * 5000) + 1000
        : Math.floor(Math.random() * 500) + 10;

    const randomDaysAgo = Math.floor(Math.random() * 180); // Last 6 months
    const recordDate = new Date(now);
    recordDate.setDate(recordDate.getDate() - randomDaysAgo);

    records.push({
      amount: amount.toString(),
      type: (isIncome || category === "SALARY" ? "INCOME" : "EXPENSE") as RecordTypeValue,
      category,
      date: recordDate,
      notes: `Sample record #${i + 1}`,
      createdById: adminUser.id,
    });
  }

  // Bulk create records
  for (const record of records) {
    await prisma.financialRecord.create({
      data: {
        amount: record.amount,
        type: record.type,
        category: record.category,
        date: record.date,
        notes: record.notes,
        createdById: record.createdById,
      },
    });
  }

  console.log(`✅ ${records.length} financial records created`);
  console.log("🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
