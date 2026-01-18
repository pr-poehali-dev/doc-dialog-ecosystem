import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export default async function handler(req: Request) {
  try {
    const { batch } = await req.json();
    
    // Read migration files
    const migrations = [
      { file: 'V0128__add_forum_content_batch1.sql', batch: 1 },
      { file: 'V0129__add_forum_content_batch2.sql', batch: 2 },
      { file: 'V0130__add_forum_content_batch3.sql', batch: 3 },
      { file: 'V0131__add_forum_content_batch4.sql', batch: 4 },
      { file: 'V0132__add_forum_content_batch5.sql', batch: 5 }
    ];

    // If batch is specified, run only that batch
    const migrationsToRun = batch 
      ? migrations.filter(m => m.batch === batch)
      : migrations;

    for (const migration of migrationsToRun) {
      // Execute migration SQL
      const migrationSQL = await fetch(`https://raw.githubusercontent.com/user/repo/main/db_migrations/${migration.file}`).then(r => r.text());
      
      // Execute the SQL
      await sql.unsafe(migrationSQL);
    }

    // Get counts
    const topicsCount = await sql`SELECT COUNT(*) as count FROM forum_topics`;
    const postsCount = await sql`SELECT COUNT(*) as count FROM forum_posts`;

    return new Response(JSON.stringify({
      success: true,
      topicsCount: topicsCount[0].count,
      postsCount: postsCount[0].count
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
