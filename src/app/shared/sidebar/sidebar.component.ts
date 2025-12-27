import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type NavItem = {
    label: string;
    route: string;
    icon: string;
    exact?: boolean;
};

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
    @Input() isMobile = false;
    @Input() open = true;
    @Input() collapsed = false;
    @Input() nav: NavItem[] = [];

    @Output() toggle = new EventEmitter<void>();
    @Output() closeMobile = new EventEmitter<void>();
    @Output() logout = new EventEmitter<void>();

    onNavClick() {
        if (this.isMobile) this.closeMobile.emit();
    }
}
