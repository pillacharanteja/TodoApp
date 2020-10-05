import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((data) => {
        this.isLoading = data.show;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

}
