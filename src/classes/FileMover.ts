import { basename, dirname, resolve } from 'path';
import { existsSync, mkdirSync, rename } from 'fs';

export class FileMover {
  oldPath: any;
  newPath: any;

  constructor(destinationBySource: { string: string }) {
    let source = Object.entries(destinationBySource)[0][0];
    let destination = Object.entries(destinationBySource)[0][1];
    this.oldPath = resolve(source);
    this.newPath = this.getNewFilePath(destination);
  }

  private getNewFilePath(destinationDir: string): string {
    const filename = basename(this.oldPath);
    return resolve(destinationDir + filename);
  }

  public moveFile(): void {
    const destinationDir = dirname(this.newPath);
    if (!existsSync(destinationDir)) {
      mkdirSync(destinationDir, { recursive: true });
    }

    rename(this.oldPath, this.newPath, (err) => {
      if (err) throw err;
    });

    if (this.isClassFile()) {
      this.moveMetaXmlFile();
    }
  }

  private isClassFile(){
    return this.oldPath.endsWith('.cls');
  }

  private moveMetaXmlFile(): void {
    const oldMetaFilePath = `${this.oldPath}-meta.xml`;
    const newMetaFilePath = `${this.newPath}-meta.xml`;

    rename(oldMetaFilePath, newMetaFilePath, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
