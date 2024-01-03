import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient)  {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content}
    this.http
      .post<{ name: string }>(
        'https://making-http-request-1db0d-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{[key: string]: Post}>(
        'https://making-http-request-1db0d-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(map(responseData => {
        // using pipe to transform the response data
        const postsArray: Post[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }))
  }
  
  deletePosts(){
    return this.http.delete('https://making-http-request-1db0d-default-rtdb.firebaseio.com/posts.json');
  }
}
