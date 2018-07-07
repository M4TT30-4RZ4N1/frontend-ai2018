import { Archive } from "./archive";
import { Link } from "./link";

export class NavigableArchive {
      archives:Archive[];
      _links: Link;
      constructor(archives:Archive[],_links:Link){
          this._links=_links;
          this.archives=archives;
      }
}

