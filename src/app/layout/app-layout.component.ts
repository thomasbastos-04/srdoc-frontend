import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent, NavItem } from '../shared/sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidebarComponent],
    templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
    private router = inject(Router);

    isMobile = false;
    sidebarOpen = true;
    sidebarCollapsed = false;

    nav: NavItem[] = [
        { label: 'Dashboard', route: '/app/dashboard', icon: 'db', exact: true },
        { label: 'Documentos', route: '/app/dashboard', icon: 'doc' },
        { label: 'Uploads', route: '/app/dashboard', icon: 'up' },
        { label: 'Usuários', route: '/app/dashboard', icon: 'usr' },
        { label: 'Configurações', route: '/app/dashboard', icon: 'cfg' },
    ];

    constructor() {
        this.syncViewport();
    }

    @HostListener('window:resize')
    syncViewport() {
        this.isMobile = window.innerWidth < 1024;
        if (this.isMobile) {
            this.sidebarOpen = false;
            this.sidebarCollapsed = false;
        } else {
            this.sidebarOpen = true;
        }
    }

    toggleSidebar() {
        if (this.isMobile) {
            this.sidebarOpen = !this.sidebarOpen;
            return;
        }
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    closeMobileSidebar() {
        if (this.isMobile) this.sidebarOpen = false;
    }

    logout() {
        this.router.navigate(['/login']);
    }
}
