import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../services/seguridad/token.service";

const tokenService: TokenService = new TokenService();
export const AuthGuardian = () => {

    const router = inject(Router);

    if (tokenService.isLogged()) {
        return true
    }
    
    router.navigate(['/auth/login']);
    
    return false
}