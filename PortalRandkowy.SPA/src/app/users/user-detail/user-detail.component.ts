import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        preview: false,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];
    this.galleryImages = this.getImages();

  }

  getImages()
  {
    const imagesUrls = [];
    for (let i = 0; i < this.user.photos.length; i++)
    {
      imagesUrls.push
      (
        {
          small:       this.user.photos[i].url,
          medium:      this.user.photos[i].url,
          big:         this.user.photos[i].url,
          description: this.user.photos[i].description
        }
      );
    }
    return imagesUrls;
  }
}
