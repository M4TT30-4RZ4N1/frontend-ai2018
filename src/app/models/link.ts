export class Link{
  public self:Href;
  public next: Href;
  public previous: Href;
  constructor(self:Href,next:Href=null,previous:Href=null){
      this.self=self;
      this.next=next;
      this.previous=previous;
  }
}
export class Href{
  public href: string;
}
