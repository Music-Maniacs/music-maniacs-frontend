export interface Version {
  id: string;
  item_type: string;
  item_id: string;
  event: 'create' | 'update' | 'destroy';
  object: {
    [key: string]: any;
  };
  whodunnit: string;
  anonymous: boolean;
  created_at: string;
  named_object_changes: {
    [key: string]: [string | null, string];
  }[];
  user?: {
    id: string;
    full_name: string;
  };
}
