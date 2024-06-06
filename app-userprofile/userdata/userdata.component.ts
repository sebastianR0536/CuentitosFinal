import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/interfaces/user';
import { UserToolsService } from 'src/app/services/user-tools.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Input() username?: string;
  @Input() email?: string;
  @Input() verificado?: boolean;
  @Input() plan?: string;
  dateInit= "10-04-2023"
  dateFinal= "10-05-2023"
  editar = false;
  aparecenErrores = false;
  passwordForm!: FormGroup;


  cpusername?:string
  cpemail?:string

  constructor(private userService: UserToolsService, private userAuthService: AuthService, private formbuilder: FormBuilder){}

  ngOnInit(): void {
    this.passwordForm = this.initForm()
  }

  ngOnChanges(changes: SimpleChanges): void{
    // if (changes['user']){
    //   console.log(this.user)
    //   this.username = this.user?.displayName;
    //   this.email = this.user?.email;
    //   this.verificado = this.user?.emailVerified;
    //   this.plan = this.user?.plan;
    // }
  }

  initForm(): FormGroup{
    return this.formbuilder.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(9)
      ]],
      replynewPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(9)
      ]]
    })
  }



  editarInformacion(){
    this.editar = true;
    this.cpusername = this.username;
    this.cpemail = this.email;
  }

  aceptarEdicion(){
    this.editar = false;
    const new_user: User = {
      uid: this.user?.uid,
      email: this.email,
      displayName: this.username,
      plan: this.plan,
      photoURL: this.user?.photoURL,
      emailVerified: this.verificado,
      favoriteBooksList: this.user?.favoriteBooksList,
      followers: this.user?.followers,
      following: this.user?.following,
      readingHistory: this.user?.readingHistory,
      rol:'USER',
      notifications: this.user?.notifications
    }
    this.userAuthService.UpdateEmail(new_user.email!);
    this.userService.updateUser(new_user);
  }

  cancelarEdicion(){
    this.username = this.cpusername;
    this.email = this.cpemail;
    this.editar = false;
  }

  newpasswordConfirmation(){
    const password = this.passwordForm.value.newPassword;
    const confirmPassword = this.passwordForm.value.replynewPassword;
    if ((password == confirmPassword) && (password != "")) {
      return true;
    }
    return false;
  }

  async onSubmit(){
    this.aparecenErrores = true;
    if(this.passwordForm.valid){
      if(this.newpasswordConfirmation()){
        let response = await this.userAuthService.UpdatePassword(this.passwordForm.value.newPassword);
        if(response == undefined){
          alert("La contraseña se ha actualizado con exito")
        }
        else{
          console.log("Vuelva a logearse para poder realizar esta acción")
          this.userAuthService.SignOut()
        }
      }
    }
    
  }

  cancelPlan() {
    if (this.user) {
      this.user.plan = "sinPlan";
      this.userService.updateUser(this.user);
      alert("Al cancelar su plan no podrá iniciar sesión hasta que se suscriba nuevamente a alguno de nuestros planes")
      this.userAuthService.SignOut();
    }
  }

}
