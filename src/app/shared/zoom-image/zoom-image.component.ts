import { Component, Input } from '@angular/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.scss']
})
export class ZoomImageComponent {
  @Input() public_key: string | undefined;
  docHashpUrl = environment.docHashpUrl;
}
