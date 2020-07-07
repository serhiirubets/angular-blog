import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFBCreateResponse, IPost} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  create(post: IPost): Observable<IPost> {
    return this.http.post<IFBCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((r: IFBCreateResponse) => {
          return {
            ...post,
            id: r.name,
            date: new Date(post.date),
          };
        })
      );
  }

  getAll(): Observable<IPost[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((r: {[key: string]: any}) => {
          return Object.keys(r)
            .map(key => ({
              ...r[key],
              id: key,
              date: new Date(r[key].date)
            }));
        })
      );
  }

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: IPost) => {
        return {
          ...post,
          id,
          date: new Date(post.date),
        };
      })
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}
