import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { Photo } from '../domainModel/photoList.domain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  pageNumber = 1;
  photoList: Array<Photo>;
  rating: any ;
  ratedPhoto = null;
  showloader: boolean;

  constructor(
    private flickrService: FlickrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPhotoList();
    this.rating = this.flickrService.ratingArray();
    this.flickrService.ratedImg.subscribe(res => {
      this.ratedPhoto = res;
    });
  }

  getPhotoList() {
    this.showloader = true;
    this.flickrService.getPhotoDetail(this.pageNumber).subscribe(result => {
      this.photoList = result.photos.photo;
      this.photoList.forEach(elt => {
        if (this.ratedPhoto != null && elt.id === this.ratedPhoto.id ) {
          this.rating = this.ratedPhoto.rating;
        }
      });
      this.showloader = false;
    });
  }

  getPhoto(photo: Photo): string {
    return this.flickrService.getPhoto(photo);
  }

  selectedImage(photo: Photo) {
    this.flickrService.selectedPhoto(photo);
    this.router.navigate(['detail']);
  }


}
