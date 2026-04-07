import { createClient } from '@/utils/supabase/client';
import { Room } from './types';

// Unique ID generator for mock data (unused now, handled by Supabase)
export const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export async function createRoom(data: Partial<Room>): Promise<Room> {
  const supabase = createClient();
  
  const { data: newRoom, error } = await supabase
    .from('rooms')
    .insert([data])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating room:', error);
    throw new Error(error.message);
  }
  
  return newRoom as Room;
}

export async function updateRoom(id: string, data: Partial<Room>): Promise<Room> {
  const supabase = createClient();
  
  const { data: updatedRoom, error } = await supabase
    .from('rooms')
    .update(data)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating room:', error);
    throw new Error(error.message);
  }
  
  return updatedRoom as Room;
}

export async function deleteRoom(id: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting room:', error);
    throw new Error(error.message);
  }
  
  return true;
}
