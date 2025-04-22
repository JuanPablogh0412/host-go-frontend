import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/login.service';
import { Subscription } from 'rxjs';

interface UserDto {
  arrendadorId?: number;
  arrendatarioId?: number;
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = '';
  userRole: 'ARRENDADOR' | 'ARRENDATARIO' | null = null;
  menuOpen = false;

  private sub!: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.auth.authState$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        const raw = localStorage.getItem('user');
        if (raw) {
          const u: UserDto = JSON.parse(raw);
          this.userName = `${u.nombre}`;
          this.userRole = u.arrendadorId != null ? 'ARRENDADOR' : 'ARRENDATARIO';
        }
      } else {
        this.userName = '';
        this.userRole = null;
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.auth.logout();
    this.menuOpen = false;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
