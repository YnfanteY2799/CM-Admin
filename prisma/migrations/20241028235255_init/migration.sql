-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "verified_email" BOOLEAN DEFAULT false,
    "password" VARCHAR(255) NOT NULL,
    "password_salt" VARCHAR(255) NOT NULL,
    "status_id" SMALLINT NOT NULL DEFAULT 1,
    "status_Id" SMALLINT,
    "create_time" DATE DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveTempTokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hashed_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "token_type" INTEGER NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveTempTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account_Status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "createTime" DATE DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATE,

    CONSTRAINT "Account_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token_Type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE,

    CONSTRAINT "Token_Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveTempTokens_user_id_key" ON "ActiveTempTokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveTempTokens_hashed_token_key" ON "ActiveTempTokens"("hashed_token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_Id_fkey" FOREIGN KEY ("status_Id") REFERENCES "Account_Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTempTokens" ADD CONSTRAINT "ActiveTempTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTempTokens" ADD CONSTRAINT "ActiveTempTokens_token_type_fkey" FOREIGN KEY ("token_type") REFERENCES "Token_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
