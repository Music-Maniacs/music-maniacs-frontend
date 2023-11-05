export type Policy = {
  index?: boolean;
  destroy?: boolean;
  create?: boolean;
  show?: boolean;
  update?: boolean;
  follow?: boolean;
  unfollow?: boolean;

  [x: string]: boolean | undefined;
};
