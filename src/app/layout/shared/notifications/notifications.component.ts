import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { SocketService } from "../../../core/services/socket.service";
import { Subscription } from "rxjs";
import { AppEvent } from "../../../core/enums/app-event.enum";
import { Notification } from "../../../core/entity/interfaces/notification.interface";
import { AppService } from "../../../app.service";
import { AuthService } from "../../../core/services";
import { NotificationStatus } from "../../../core/entity/enums/notification-status.enum";
import { deepCopyObject } from "../../../core/utils";

@Component({
    selector: "app-notifications",
    templateUrl: "./notifications.component.html",
    styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit, OnDestroy {
    notifications: Notification[] = [];

    unreadCount: number = 0;

    opened: boolean = false;

    time = new Date();

    messageSub?: Subscription;

    constructor(private app: AppService, private readonly authService: AuthService, private readonly socketService: SocketService) {}

    ngOnInit(): void {
        this.getMe();
    }

    getMe(): void {
        this.authService.me().subscribe({
            next: user => {
                const notifications = deepCopyObject(user?.notifications ?? []);
                notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                this.notifications = notifications;
                this.updateRead();
                this.messageSub = this.socketService.onMessage<Notification>(AppEvent.NOTIFICATION_CREATED)?.subscribe(notification => {
                    this.notifications.unshift(notification);
                    if (this.opened) {
                        this.setRead();
                    } else {
                        this.unreadCount++;
                    }
                });
            },
            error: err => {
                this.app.error(err.error.message ?? "Something went wrong!");
            },
        });
    }

    @HostListener("document:click", ["$event"])
    onClick(e: MouseEvent): void {
        if (!(e.target as HTMLElement).closest(".notifications")) {
            if (this.opened) {
                this.opened = false;
                this.setRead();
            }
        }
    }

    toggle(): void {
        if (!this.opened) {
            this.unreadCount = 0;
        } else {
            this.setRead();
        }
        this.opened = !this.opened;
    }

    notificationClick(e: MouseEvent): void {
        if (!(e.target as HTMLElement).closest(".remove")) {
        }
    }

    setRead(): void {
        this.socketService.sendMessage(AppEvent.NOTIFICATION_READ, {});
        this.notifications.forEach(notification => {
            notification.status = NotificationStatus.READ;
        });
        this.updateRead();
    }

    updateRead(): void {
        this.unreadCount = this.notifications.filter(notification => notification.status === NotificationStatus.UNREAD).length;
    }

    async remove(id: number): Promise<void> {
        await this.socketService.sendMessageAsync<{ id: number }, Notification>(AppEvent.NOTIFICATION_DELETE, { id });
        this.notifications = this.notifications.filter(notification => notification.id !== id);
    }

    ngOnDestroy(): void {
        this.messageSub?.unsubscribe();
    }

    protected readonly NotificationStatus = NotificationStatus;
}
