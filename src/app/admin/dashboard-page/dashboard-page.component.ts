import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPost} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchText = '';

  constructor(private postsService: PostsService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.alertService.danger('Post has removed');
      });
  }
}
