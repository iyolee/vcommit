export interface IPackage {
  version: string;
  scripts?: {
    changelog?: string;
  };
  dependencies: {};
  devDependencies: {};
  husky?: {
    hooks?: {
      'commit-msg'?: string;
    };
  };
}
