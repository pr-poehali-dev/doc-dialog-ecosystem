import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const sql = postgres(process.env.DATABASE_URL!);

async function applyMigrations() {
  const migrations = [
    'V0128__add_forum_content_batch1.sql',
    'V0129__add_forum_content_batch2.sql',
    'V0130__add_forum_content_batch3.sql',
    'V0131__add_forum_content_batch4.sql',
    'V0132__add_forum_content_batch5.sql'
  ];

  console.log('Starting forum content migrations...\n');

  for (const migrationFile of migrations) {
    console.log(`Applying ${migrationFile}...`);
    const filePath = join(process.cwd(), 'db_migrations', migrationFile);
    const migrationSQL = readFileSync(filePath, 'utf-8');
    
    try {
      await sql.unsafe(migrationSQL);
      console.log(`✓ ${migrationFile} applied successfully`);
    } catch (error: any) {
      console.error(`✗ Error applying ${migrationFile}:`, error.message);
      throw error;
    }
  }

  // Get final counts
  console.log('\nGetting final counts...');
  const topicsResult = await sql`SELECT COUNT(*) as count FROM forum_topics`;
  const postsResult = await sql`SELECT COUNT(*) as count FROM forum_posts`;

  console.log(`\n✓ Migration complete!`);
  console.log(`Total forum topics: ${topicsResult[0].count}`);
  console.log(`Total forum posts: ${postsResult[0].count}`);

  await sql.end();
}

applyMigrations().catch(console.error);
