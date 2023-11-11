-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "id_author" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
