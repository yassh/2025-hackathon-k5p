import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "invitations" ADD COLUMN "image_id" integer;
  ALTER TABLE "invitations" ADD CONSTRAINT "invitations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "invitations_image_idx" ON "invitations" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "invitations" DROP CONSTRAINT "invitations_image_id_media_id_fk";
  
  DROP INDEX "invitations_image_idx";
  ALTER TABLE "invitations" DROP COLUMN "image_id";`)
}
