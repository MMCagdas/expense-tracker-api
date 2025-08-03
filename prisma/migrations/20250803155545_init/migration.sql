-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('GROCERIES', 'LEISURE', 'ELECTRONICS', 'UTILITIES', 'CLOTHING', 'HEALTH', 'OTHERS');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "public"."Category" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "userid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
