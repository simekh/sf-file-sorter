import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';

export class FolderCrawler {
  public async *getMovableFiles(rootPath: string): any {
    const fileNames = await readdir(rootPath);
    for (const fileName of fileNames) {
      const path = resolve(rootPath, fileName);
      if ((await stat(path)).isDirectory()) {
        yield* this.getMovableFiles(path);
      } else if (!this.isSFClassMetaFile(fileName)) {
        yield path;
      }
    }
  }

  private isSFClassMetaFile(fileName: string): boolean {
    return fileName.endsWith('.cls-meta.xml');
  }
}
