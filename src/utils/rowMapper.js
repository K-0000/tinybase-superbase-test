export function mapSupabaseRowToTinyBase(row) {
  return {
    title: row.title,
    is_done: row.is_done,
    updated_at: row.updated_at,
  };
}
