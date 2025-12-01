import { supabase } from '../supabaseClient.js';

export function enableRealtimeSync(store) {
  // Supabase → TinyBase
  supabase
    .channel('todos-sync')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'todos' },
      (payload) => {
        const row = payload.new || payload.old;
        if (!row?.id) return;

        if (payload.eventType === 'DELETE') {
          store.delRow('todos', row.id);
        } else {
          store.setRow('todos', row.id, {
            title: row.title ?? '',
            is_done: row.is_done ?? false,
            updated_at: row.updated_at ?? new Date().toISOString()
          });
        }
      }
    )
    .subscribe();

  // TinyBase → Supabase
  store.addRowListener('todos', null, async (store, tableId, rowId, newRow) => {
    if (!newRow) {
      const { error } = await supabase.from('todos').delete().eq('id', rowId);
      if (error) console.error('Delete TinyBase -> Supabase error:', error);
      return;
    }

    // Only upsert if all required fields exist
    const rowToSave = {
      id: rowId,
      title: newRow.title ?? '',
      is_done: newRow.is_done ?? false,
      updated_at: newRow.updated_at ?? new Date().toISOString()
    };

    const { error } = await supabase.from('todos').upsert(rowToSave);
    if (error) console.error('TinyBase -> Supabase error:', error);
  });
}
