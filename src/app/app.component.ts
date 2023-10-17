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

  clear(){
    this.user= new User;
  }
}
