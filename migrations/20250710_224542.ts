import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "invitations" ALTER COLUMN "end_date" DROP NOT NULL;
  ALTER TABLE "invitations" ALTER COLUMN "max_participants" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "invitations" ALTER COLUMN "end_date" SET NOT NULL;
  ALTER TABLE "invitations" ALTER COLUMN "max_participants" SET NOT NULL;`)
}
