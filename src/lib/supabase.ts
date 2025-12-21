import { createClient } from '@supabase/supabase-js';
import { Company } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveCompany(company: Company): Promise<{ data: Company | null; error: any }> {
  const { data, error } = await supabase
    .from('companies')
    .insert([company])
    .select()
    .single();

  return { data, error };
}

export async function updateCompany(
  id: string,
  updates: Partial<Company>
): Promise<{ data: Company | null; error: any }> {
  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function getCompanies(): Promise<{ data: Company[] | null; error: any }> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function getCompany(id: string): Promise<{ data: Company | null; error: any }> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

export async function deleteCompany(id: string): Promise<{ error: any }> {
  const { error } = await supabase
    .from('companies')
    .delete()
    .eq('id', id);

  return { error };
}

export function login(password: string): boolean {
  const correctPassword = import.meta.env.VITE_SITE_PASSWORD || 'BryanVC2025';
  
  if (password === correctPassword) {
    localStorage.setItem('authenticated', 'true');
    return true;
  }
  
  return false;
}

export function logout(): void {
  localStorage.removeItem('authenticated');
}

export function isAuthenticated(): boolean {
  return localStorage.getItem('authenticated') === 'true';
}