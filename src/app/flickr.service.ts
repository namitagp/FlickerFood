import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Photo } from './domainModel/photoList.domain';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private flickrParams = {
    params: {
      api_key: 'cf422adaac32b939a73ecf9f444a1a41',
      format: 'json',
      nojsoncallback: '1',
      per_page: '30'
    }
  };

  private readonly flickrUrl = 'https://api.flickr.com/services/rest/';
  photo: Photo;

  ratedImg = new ReplaySubject(1);

  constructor(private http: HttpClient) { }

  getPhotoDetail(pageNumber: number): Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.search';
    this.flickrParams.params['tags'] = 'food, food dishes, vegetables, fruits, sea food, vegeterian food, non-vegeterian food';
    this.flickrParams.params['text'] = 'food';
    this.flickrParams.params['page'] = pageNumber.toString();
    return this.http.get<any>(API_URL, this.flickrParams);
  }

  getInfo(photoId: string): Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.getInfo';
    this.flickrParams.params['photo_id'] = photoId;
    return this.http.get<any>(API_URL, this.flickrParams);
  }

  getPhoto(photo: any): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }

  selectedPhoto(photo: Photo) {
    this.photo = photo;
  }
  ratingArray() {
    const rating = [
      {value: 1, isClicked: false},
      {value: 2, isClicked: false},
      {value: 3, isClicked: false},
      {value: 4, isClicked: false},
      {value: 5, isClicked: false},
      {value: 6, isClicked: false},
      {value: 7, isClicked: false},
      {value: 8, isClicked: false},
      {value: 9, isClicked: false},
      {value: 10, isClicked: false},
    ];
    return rating;
  }
}
