import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'jumbo-travel-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  sideNavMode: MatDrawerMode = 'side';
  script: string | undefined;

  constructor(    @Inject(DOCUMENT) private document: Document,    private renderer: Renderer2

  ) {}

  ngOnInit(): void {}

  handleLogin() {
   // this.sideNavMode = 'over';
     //this.authService.guardAuth();
  }
  public loadJsScript(): HTMLScriptElement {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = this.script;

    this.renderer.appendChild(this.document.body, script);
    return script;
  }
}
