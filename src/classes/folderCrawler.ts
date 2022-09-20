import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';

export class folderCrawler {
  public async *getFilePaths(rootPath: string): any {
    const fileNames = await readdir(rootPath);
    for (const fileName of fileNames) {
      const path = resolve(rootPath, fileName);
      if ((await stat(path)).isDirectory()) {
        yield* this.getFilePaths(path);
      } else {
        yield path;
      }
    }
  }
}
