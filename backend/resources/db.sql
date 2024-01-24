-- Drop tables if they exist
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "bike" CASCADE;
DROP TABLE IF EXISTS "booking" CASCADE;
DROP TABLE IF EXISTS "booking_bike" CASCADE;

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
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "is_active" boolean not null,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

-- Create index on account table
CREATE INDEX "account_search_idx" ON "account" ("email");

create table "bike" (
  "id" SERIAL PRIMARY KEY,
  "numbering" INT UNIQUE NOT NULL,
  "size" varchar(20) not null,
  "current_status" varchar(20) not null,
  "is_active" boolean not null,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

create index "bike_size_idx" on "bike"("size");

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
  foreign key ("user_id") references "user"("id")
);

create index "booking_user_id_idx" on "booking"("user_id");
create index "booking_status_idx" on "booking"("status");

create table "booking_bike" (
  "id" serial primary key, 
  "booking_id" int not null, 
  "bike_id" int not null, 
  foreign key ("booking_id") references "booking"("id"), 
  foreign key ("bike_id") references "bike"("id")
);

create index "booking_bike_left_idx" on "booking_bike"("booking_id");
create index "booking_bike_right_idx" on "booking_bike"("bike_id");
