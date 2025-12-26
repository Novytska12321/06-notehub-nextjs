// lib/api.ts
import axios from 'axios';
import type { Note, NoteFormValues, UpdateNoteParams } from '../types/note';

interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const authHeader = {
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
};

/**
 * Отримати список нотаток
 */
export async function fetchNotes(search: string, page: number): Promise<NotesHTTPResponse> {
  const resp = await axios.get<NotesHTTPResponse>('/notes', {
    params: { search, page, perPage: 12 },
    ...authHeader,
  });
  return resp.data;
}

/**
 * Отримати одну нотатку за id
 */
export async function fetchSingleNote(id: string): Promise<Note> {
  const resp = await axios.get<Note>(`/notes/${id}`, authHeader);
  return resp.data;
}

/**
 * Створити нову нотатку
 */
export async function createNote({ title, content, tag }: NoteFormValues): Promise<Note> {
  const resp = await axios.post<Note>('/notes', { title, content, tag }, authHeader);
  return resp.data;
}

/**
 * Оновити нотатку
 */
export async function updateNote(id: string, payload: UpdateNoteParams): Promise<Note> {
  const resp = await axios.patch<Note>(`/notes/${id}`, payload, authHeader);
  return resp.data;
}

/**
 * Видалити нотатку
 */
export async function deleteNote(id: string): Promise<Note> {
  const resp = await axios.delete<Note>(`/notes/${id}`, authHeader);
  return resp.data;
}
