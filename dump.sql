CREATE TYPE class AS ENUM ('T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10');

CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"question" varchar(7000) NOT NULL,
	"points" integer NOT NULL DEFAULT '1',
	"tags" varchar(255) NOT NULL,
	"submit_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class" class NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"answer" varchar(255) NOT NULL,
	"answeredAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");