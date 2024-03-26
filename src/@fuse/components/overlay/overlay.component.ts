import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FuseLoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
  isLoading: Observable<boolean>;

  constructor(private fuseLoadingService: FuseLoadingService) {
    this.isLoading = this.fuseLoadingService.show$;
  }
}
