export interface Version {
  id: string;
  item_type: string;
  item_id: string;
  event: 'create' | 'update' | 'destroy';
  whodunnit: string;
  anonymous: boolean;
  created_at: string;
  object_changes: {
    [key: string]: [string | null, string];
  }[];
  user?: {
    id: string;
    full_name: string;
  };
}
