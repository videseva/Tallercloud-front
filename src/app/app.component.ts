import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  users2: any[] =[];
  user: User = new User;
  users: User[] = [];// La lista de objetos

  selectedFile: File | null = null;


  constructor(private userServices: UsuarioService,) { }
  ngOnInit() {
    this.get();
  }

  postUser() {  
    this.userServices.post(this.user).subscribe(data => {
      console.log('Usuario creado:', data);
    alert("Usuario Registrado con exito !");
    this.clear();
    this.get();
    
    });
  }
  get(){
    this.userServices.get().subscribe(result => {
      this.users = result;
    });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

  }

  uploadImage() {
    if (this.selectedFile) {
      console.log('selectedFile', this.selectedFile);
      this.userServices.uploadFile(this.selectedFile).subscribe(data => {
        console.log('Imagen creado:', data);
        this.user.photo = data.unique_name;
        alert("Imagen cargada con exito !");
      },
      (error) => {
        // Maneja los errores si es necesario
        console.error('Error al cargar el archivo:', error);
      });
    }
  }

  clear(){
    this.user= new User;
  }
}
