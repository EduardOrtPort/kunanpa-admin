import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  miFormulario: FormGroup = this._fb.group({
    email: ['admin@correo.com', [Validators.required, Validators.email]],
    password: ['admin2022', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private _fb:FormBuilder,
              private _authService: AuthService,
              private _router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login(){
    console.log(this.miFormulario.value);

    const {email, password} = this.miFormulario.value
    
    this._authService.login(email, password)
      .subscribe(resp => {
        //console.log(resp);
        if(resp.token){
          this._router.navigateByUrl('/admin/dashboard');
        }else{
          console.log(resp)
          Swal.fire('Error', resp.message, 'error')
          //MOSTRAR MENSAJE DE ERROR
        }
      });

    
  }

}
