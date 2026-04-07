import { createClient } from '@/utils/supabase/client';
import { Room, RoomFilters } from './types';

export async function getRooms(filters: RoomFilters = {}): Promise<Room[]> {
  const supabase = createClient();
  let query = supabase
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.keyword && filters.keyword.trim() !== '') {
    const kw = `%${filters.keyword.trim()}%`;
    query = query.or(`title.ilike.${kw},address.ilike.${kw}`);
  }

  if (filters.minPrice && filters.minPrice > 0) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters.maxPrice && filters.maxPrice > 0) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters.district && filters.district.trim() !== '') {
    query = query.eq('district', filters.district);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }

  return (data as Room[]) || [];
}

export async function getRoomById(id: string): Promise<Room | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching room:', error);
    return null;
  }

  return data as Room;
}

export async function getDistricts(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('rooms')
    .select('district')
    .order('district');

  if (error) {
    console.error('Error fetching districts:', error);
    return [];
  }

  const districts = [...new Set((data || []).map((r: { district: string }) => r.district))];
  return districts.filter(Boolean);
}
