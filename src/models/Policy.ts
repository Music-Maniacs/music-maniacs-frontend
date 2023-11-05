export type Policy = {
  index?: boolean;
  destroy?: boolean;
  create?: boolean;
  show?: boolean;
  update?: boolean;
  follow?: boolean;
  unfollow?: boolean;
  restore_backup?: boolean;
  metrics_and_user_type?: boolean;
  block?: boolean;
  unblock?: boolean;
  restore?: boolean;

  [x: string]: boolean | undefined;
};
