import { supabase } from '../supabaseClient.js';

export function enableRealtimeSync(store) {
  // Listen for Supabase changes
  supabase
    .channel('todos-sync')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'todos' },
      (payload) => {
        const row = payload.new || payload.old;
        if (payload.eventType === 'DELETE') {
          store.delRow('todos', row.id);
        } else {
          store.setRow('todos', row.id, {
            title: row.title,
            is_done: row.is_done,
            updated_at: row.updated_at
          });
        }
      }
    )
    .subscribe();

  console.log('Realtime sync enabled.');

  // TinyBase → Supabase sync
  store.addRowListener('todos', null, async (store, tableId, rowId, newRow) => {
    const { error } = await supabase.from('todos').upsert({
      id: rowId,
      title: newRow.title,
      is_done: newRow.is_done,
      updated_at: newRow.updated_at
    });
    if (error) console.error('TinyBase -> Supabase error:', error);
  });
}
