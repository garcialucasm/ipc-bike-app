-- Drop tables if they exist
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "bike" CASCADE;
DROP TABLE IF EXISTS "booking_bike" CASCADE;
DROP TABLE IF EXISTS "booking" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;

-- Create user table
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "type" VARCHAR(20) NOT NULL,
  "room" VARCHAR(10) NOT NULL,
  "term" VARCHAR(20) NOT NULL,
  "status" VARCHAR(20) NOT NULL,
  "is_active" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

-- Create index on user table
CREATE INDEX "user_search_idx" ON "user" ("name", "room", "term");

-- Create account table
CREATE TABLE "account" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(20) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "hash" VARCHAR(255) NOT NULL,
  "is_active" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

-- Create index on account table
CREATE INDEX "account_search_idx" ON "account" ("email");

-- Create bike table
create table "bike" (
  "id" SERIAL PRIMARY KEY,
  "numbering" INT UNIQUE NOT NULL,
  "bike_type" varchar(20) not null,
  "size" varchar(20) not null,
  "current_status" varchar(20) not null,
  "is_active" boolean not null,
  "is_classroom_bike" boolean not null,
  "characteristics" JSONB DEFAULT '{}'::JSONB,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

-- Create index on bike table
create index "bike_size_idx" on "bike"("size");

-- Create booking table
create table "booking" (
  "id" serial primary key,
  "user_id" int not null,
  "status" varchar(20) not null,
  "type" varchar(20) not null,
  "bike_count" int not null, 
  "returned_condition" varchar(255),
  "notes" varchar(255),
  "created_at" timestamp,
  "confirmed_at" timestamp,
  "returned_at" timestamp,
  "canceled_at" timestamp,
  "created_by_account_id" INT,
  "confirmed_by_account_id" INT,
  "returned_by_account_id" INT,
  "canceled_by_account_id" INT,
  FOREIGN KEY ("user_id") REFERENCES "user"("id"),
  FOREIGN KEY ("created_by_account_id") REFERENCES "account"("id"),
  FOREIGN KEY ("confirmed_by_account_id") REFERENCES "account"("id"),
  FOREIGN KEY ("returned_by_account_id") REFERENCES "account"("id"),
  FOREIGN KEY ("canceled_by_account_id") REFERENCES "account"("id")
);

-- Create indexes on booking table
CREATE INDEX "booking_user_id_idx" ON "booking"("user_id");
CREATE INDEX "booking_status_idx" ON "booking"("status");
CREATE INDEX "booking_created_by_account_idx" ON "booking"("created_by_account_id");
CREATE INDEX "booking_confirmed_by_account_idx" ON "booking"("confirmed_by_account_id");
CREATE INDEX "booking_returned_by_account_idx" ON "booking"("returned_by_account_id");
CREATE INDEX "booking_canceled_by_account_idx" ON "booking"("canceled_by_account_id");

-- Create booking_bike table
create table "booking_bike" (
  "id" serial primary key, 
  "booking_id" int not null, 
  "bike_id" int not null, 
  foreign key ("booking_id") references "booking"("id"), 
  foreign key ("bike_id") references "bike"("id")
);

-- Create indexes on booking_bike table
create index "booking_bike_left_idx" on "booking_bike"("booking_id");
create index "booking_bike_right_idx" on "booking_bike"("bike_id");
