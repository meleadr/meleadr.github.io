import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { NodeService } from '../services/node.service';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { MenubarModule } from 'primeng/menubar';
import { DockModule } from 'primeng/dock';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',

  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    DockModule,
    ToastModule,
    DialogModule,
    TreeModule,
    TerminalModule,
    GalleriaModule,
    FormsModule,
  ],
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
  providers: [PhotoService, NodeService, MessageService, TerminalService],
})
export class DesktopComponent implements OnInit, OnDestroy, AfterViewInit {
  displayTerminal!: boolean;
  displayFinder!: boolean;
  displayGalleria!: boolean;
  dockItems!: MenuItem[];
  menubarItems!: any[];
  responsiveOptions!: any[];
  images!: any[];
  nodes!: any[];
  subscription!: Subscription;
  time: Date = new Date();
  selectedNode: any;

  constructor(
    private galleriaService: PhotoService,
    private nodeService: NodeService,
    private messageService: MessageService,
    private terminalService: TerminalService,
  ) {}

  ngOnInit() {
    this.dockItems = [
      {
        label: 'Finder',
        tooltipOptions: {
          tooltipLabel: 'Finder',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/finder.svg',
        command: () => {
          this.displayFinder = true;
        },
      },
      {
        label: 'Terminal',
        tooltipOptions: {
          tooltipLabel: 'Terminal',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/terminal.svg',
        command: () => {
          this.displayTerminal = true;
        },
      },
      {
        label: 'Calendar',
        tooltipOptions: {
          tooltipLabel: 'Calendar',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/calendar.svg',
        command: () => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Calendar',
            detail: 'No events scheduled',
          });
        },
      },
      {
        label: 'App Store',
        tooltipOptions: {
          tooltipLabel: 'App Store',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/appstore.svg',
        command: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'An unexpected error occurred while signing in.',
            detail: 'UNTRUSTED_CERT_TITLE',
          });
        },
      },
      {
        label: 'Safari',
        tooltipOptions: {
          tooltipLabel: 'Safari',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/safari.svg',
        command: () => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Safari has stopped working',
          });
        },
      },
      {
        label: 'Photos',
        tooltipOptions: {
          tooltipLabel: 'Photos',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/photos.svg',
        command: () => {
          this.displayGalleria = true;
        },
      },
      {
        label: 'GitHub',
        url: 'https://github.com/meleadr/',
        tooltipOptions: {
          tooltipLabel: 'GitHub',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/github.svg',
      },
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/meleadr/',
        tooltipOptions: {
          tooltipLabel: 'LinkedIn',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/linkedin.svg',
      },
      {
        label: 'Discord',
        url: 'https://linkedin.com/in/meleadr/',
        tooltipOptions: {
          tooltipLabel: 'Discord',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/discord.svg',
      },
      {
        label: 'Trash',
        tooltipOptions: {
          tooltipLabel: 'Trash',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: '/assets/img/dock/trash.png',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Empty Trash' });
        },
      },
    ];

    this.menubarItems = [
      {
        label: 'Finder',
        styleClass: 'menubar-root',
      },
      {
        label: 'File',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Edit',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Users',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Quit',
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    this.subscription = this.terminalService.commandHandler.subscribe(
      (command) => this.commandHandler(command),
    );

    this.galleriaService.getImages().then((data) => (this.images = data));
    this.nodeService.getFiles().then((data) => (this.nodes = data));
  }

  commandHandler(text: any) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hi ' + text.substring(argsIndex + 1) + '!';
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      case 'clear':
        break;

      case 'ls':
        response = this.nodeService.getFiles();
        console.log(response);
        break;

      case 'help':
        response = 'Available commands: date, greet, random';
        break;

      default:
        response = 'Unknown command: ' + command;
        break;
    }

    if (response) {
      this.terminalService.sendResponse(response as string);
    }
  }

  onNodeSelect() {
    console.log(this.selectedNode);
    switch (this.selectedNode.key) {
      case '0-0-0':
        this.messageService.add({
          severity: 'success',
          summary: this.selectedNode.label,
          detail: 'Resume started downloading',
        });
        window.open('/assets/files/Resume.pdf');
        break;
      case '0-0-1':
        this.messageService.add({
          severity: 'success',
          summary: this.selectedNode.label,
          detail: 'Cover Letter started downloading',
        });
        window.open('/assets/files/CoverLetter.pdf');
        break;
      case '2-0':
        this.messageService.add({
          severity: 'success',
          summary: this.selectedNode.label,
          detail: 'Starting trailer',
        });
        window.open(this.selectedNode.data);
        break;
    }
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
