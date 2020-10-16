import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { error } from 'protractor';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getUserPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'users/' +
        this.authService.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response)
      {
        const res: Photo = JSON.parse(response);
        const photo =
        {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMainPhoto: res.isMainPhoto
        };
        this.photos.push(photo);
        if (photo.isMainPhoto)
        {
        this.authService.changeUserPhoto(photo.url);
        this.authService.curentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.curentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo)
  {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe
    (
      () =>
    {
      console.log('Sukces');
      this.currentMain = this.photos.filter(p => p.isMainPhoto == true)[0];
      this.currentMain.isMainPhoto = false;
      photo.isMainPhoto = true;
      this.authService.changeUserPhoto(photo.url);
      this.authService.curentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.curentUser));
    }, error =>
    {
      this.alertify.error(error);
    }
    );
  }

  deletePhoto(id: number)
  {
    this.alertify.confirm('Czy jesteś pewien że chcesz usunąć zdjęcie?', () =>
    {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() =>
      {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Zdjęcie zostało usunięte');
      }, error =>
      {
        this.alertify.error('Nie udało się usunąć zdjęcia');
      }
      )
    });
  }
}
